"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_locator_1 = require("../utils/package-locator");
const fs_1 = require("fs");
const semVerRex = new RegExp('^((([0-9]+)\\.([0-9]+)\\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$', 'gm');
const packageVersionRex = new RegExp('"version\\s*(.*?)\\s*,', 'g');
exports.version = function ({ setVersion, excludes, startDir }) {
    if (!semVerRex.test(setVersion)) {
        throw new Error('the version you are attempting to set is not a valid semver version');
    }
    const directories = package_locator_1.findPackageDirectories(startDir, excludes);
    directories.forEach(function (directory) {
        const filePath = directory + 'package.json';
        console.log(`Setting the version to ${setVersion} in ${filePath}`);
        fs_1.readFile(filePath, 'utf8', function (err, result) {
            if (err)
                throw err;
            const updatedPackage = result.replace(packageVersionRex, `"version": "${setVersion}",`);
            fs_1.writeFile(filePath, updatedPackage, function (err) {
                if (err)
                    throw err;
            });
        });
    });
};
//# sourceMappingURL=version.js.map