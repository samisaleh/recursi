"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_glob_1 = __importDefault(require("fast-glob"));
exports.findPackageDirectories = function (startDir = './', excludes) {
    const filePattern = `**/package.json`;
    const packageLocations = fast_glob_1.default.sync(filePattern, {
        absolute: true,
        cwd: startDir,
        ignore: ['**/node_modules', ...excludes],
    });
    if (!packageLocations.length) {
        console.info('No package files could be found in the directory specified');
        process.exit();
    }
    return packageLocations.map(location => location.replace('package.json', ''));
};
//# sourceMappingURL=package-locator.js.map