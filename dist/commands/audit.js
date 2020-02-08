"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_locator_1 = require("../utils/package-locator");
const runner_1 = require("../utils/runner");
const auditLevels = ['low', 'moderate', 'high', 'critical'];
const checkIfLevelFound = function (errors, auditLevel) {
    const levelIndex = auditLevels.indexOf(auditLevel);
    const errorLevels = auditLevels.filter((level, index) => index >= levelIndex);
    errors.split('\n').forEach(function (err) {
        const line = err.replace(/\n/g, '');
        const level = line.split('\t')[2];
        if (errorLevels.includes(level)) {
            throw new Error(line);
        }
        line && console.warn(line);
    });
};
exports.audit = function ({ auditLevel, excludes, fix, startDir }) {
    const directories = package_locator_1.findPackageDirectories(startDir, excludes);
    const fixCommand = (fix && 'fix') || '';
    directories.forEach(function (directory) {
        const command = `cd ${directory} && npm audit --parseable ${fixCommand}`;
        console.log(`Auditing directory ${directory || '/'}`);
        const hasError = runner_1.executeSystemCommand(command);
        if (hasError && fix) {
            throw new Error(hasError);
        }
        if (hasError) {
            checkIfLevelFound(hasError, auditLevel);
        }
    });
};
//# sourceMappingURL=audit.js.map