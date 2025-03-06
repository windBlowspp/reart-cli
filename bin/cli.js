#!/usr/bin/env node
const { program } = require("commander");
const spawn = require("cross-spawn");
const path = require("path");
const create = require("../lib/create");
const figlet = require("figlet");
const chalk = require("chalk");
const pkg = require("../package.json");

program
    .version(`v${pkg.version}`, "-v,--version", "output the current version")
    .addHelpText(
        "after",
        `\n${chalk.blue.bold(
            figlet.textSync("reart", {
                font: "Ghost",
                horizontalLayout: "default",
                verticalLayout: "default",
                width: 80,
                whitespaceBreak: true,
            })
        )}\n\nTips: 若不会使用art模板，请先学习art后使用本cli
      `
    )
    .showHelpAfterError(chalk.bold.red("你是真的笨，用都用不明白🙃"));

//   program.command('create <app-name>')
//   .description('创建一个新的文件并初始化reart组件')
//   .option('-f, --force', 'overwrite target directory if it exist')
//   .action((...args) => {
//     // 打印执行结果
//     create(...args)
//   })

program
    .command("init")
    .description("reart组件的相关操作（包括初始化）")
    .option("-f, --force", "在本目录直接初始化")
    .action((opts, ...args) => {
        create(opts, args);
    });

program
    .command("run")
    .description("本地预览reart项目")
    .action((opts, ...args) => {
        const _path = path.join(
            process.cwd(),
            "./node_modules/vite/bin/vite.js"
        );
        const childProcess = spawn("node", [_path], { stdio: "inherit" });
        childProcess.on("close", (code) => {
            console.error(chalk.bold.yellow(`启动项目失败`));
        });
    });

program
    .command("build")
    .description("打包reart项目")
    .action((opts, ...args) => {
        const _path = path.join(
            process.cwd(),
            "./node_modules/vite/bin/vite.js"
        );
        const childProcess = spawn("node", [_path, "build"], {
            stdio: "inherit",
        });
        childProcess.on("close", (code) => {
            console.error(chalk.bold.red(`打包项目失败`));
        });
    });

program.parse(process.argv);
