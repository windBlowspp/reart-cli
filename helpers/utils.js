const ora = require("ora");

//校验npm名称是否合法
function isValidNpmPackageName(name) {
    // 长度限制
    if (name.length > 214 || name.length === 0) {
        return false;
    }

    // 如果是 scoped package 以 @ 开头，再跟一个/，后面是 标准包名
    const scopedPackagePattern =
        /^@(?!.*\.\.)(?:[a-z0-9-]{1,63})\/(?!.*--)((?:[a-z0-9][a-z0-9-]{0,213})?)$/;
    const normalPackagePattern = /^(?!.*\.\.)([a-z0-9][a-z0-9-]{0,213}(?<!-))$/;

    return scopedPackagePattern.test(name) || normalPackagePattern.test(name);
}

async function wrapperLoading(message, fn, ...args) {
    const spinner = ora(message);
    spinner.color = "green";
    spinner.start();
    try {
        const result = await fn(...args);
        spinner.succeed(message);
        return result;
    } catch (err) {
        spinner.color = "red";
        spinner.fail(err?.message || "加载失败!");
        return null;
    }
}

module.exports = {
    isValidNpmPackageName,
    wrapperLoading,
};
