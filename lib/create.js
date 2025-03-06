const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const inquirer = require("inquirer");
const generator = require("./generator");
const { isValidNpmPackageName } = require("../helpers/utils");

module.exports = async (options, args) => {
    try {
        let { name } = await inquirer.default.prompt([
            {
                name: "name",
                type: "input",
                message: "输入项目名称",
                validate: (value) => {
                    if (isValidNpmPackageName(value)) {
                        return true;
                    }
                    return "请输入合法的项目名称";
                },
            },
        ]);

        // 当前命令行选择的目录
        const cwd = process.cwd();
        // 需要创建的目录地址
        const targetAir = path.join(cwd, name);
        const config = {
            name,
        };

        // 目录是否已经存在？
        if (fs.existsSync(targetAir)) {
            // 是否为强制创建？
            if (options.force) {
                await fs.remove(targetAir);
                generator(config);
            } else {
                let { action } = await inquirer.default.prompt([
                    {
                        name: "action",
                        type: "confirm",
                        message: "是否覆盖现有目录",
                    },
                ]);
                if (!action) return false;
                await fs.remove(targetAir);
                generator(config);
            }
        } else {
            generator(config);
        }
    } catch (err) {
        console.error(chalk.bold.red(err?.message || "初始化失败，请重试🌹"));
    }
};
