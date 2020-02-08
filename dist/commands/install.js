"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_locator_1 = require("../utils/package-locator");
const runner_1 = require("../utils/runner");
const rimraf_1 = __importDefault(require("rimraf"));
const cleanLocation = function (location) {
    const locationExtensions = ['node_modules', 'package-lock.json'];
    locationExtensions.forEach(function (extension) {
        rimraf_1.default.sync(location + extension);
    });
};
exports.install = function ({ clean = false, excludes, startDir }) {
    const directories = package_locator_1.findPackageDirectories(startDir, excludes);
    directories.forEach(function (directory) {
        if (clean) {
            console.log(`Removing existing package lock and modules in ${directory || '/'}`);
            cleanLocation(directory);
        }
        const command = `cd ${directory} && npm i`;
        console.log(`Installing packages in directory ${directory || '/'}`);
        const hasError = runner_1.executeSystemCommand(command, false);
        if (hasError) {
            throw new Error(hasError);
        }
    });
};
//# sourceMappingURL=install.js.map