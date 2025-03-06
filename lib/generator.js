const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const inquirer = require("inquirer");

async function copyDirectory(src, dest) {
    try {
        // Create the destination directory if it doesn't exist
        await fs.mkdir(dest, { recursive: true });

        // Read the contents of the source directory
        const entries = await fs.readdir(src, { withFileTypes: true });

        for (let entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                // Recursively copy subdirectories
                await copyDirectory(srcPath, destPath);
            } else {
                // Copy files
                await fs.copyFile(srcPath, destPath);
            }
        }
    } catch (error) {
        console.error(`Error copying directory from ${src} to ${dest}:`, error);
    }
}

module.exports = async (config) => {
    const { name } = config || {};
    let { type } = await inquirer.default.prompt([
        {
            name: "type",
            type: "list",
            message: "选中模板",
            choices: ["react-tpl", "reart-tpl"],
            default: "react-tpl",
        },
    ]);
    const spinner = ora("下载模板中......");
    spinner.color = "green";
    spinner.start();
    const cwd = process.cwd();
    const sourcePath = path.join(__dirname, `../templates/${type}`);
    const destinationPath = path.join(cwd, name);
    copyDirectory(sourcePath, destinationPath)
        .then(() => {
            spinner.succeed(chalk.blod.green(`${type}模板下载成功`));
        })
        .catch((err) => {
            spinner.fail(
                chalk.blod.red(err?.message || "模板下载失败，请稍后重试!")
            );
        });
};
