import { findPackageDirectories } from '../utils/package-locator';
import { BaseOptions } from '../cli';
import { readFile, writeFile } from 'fs';

interface VersionOptions extends BaseOptions {
    setVersion: string;
}

const semVerRex = new RegExp(
    '^((([0-9]+)\\.([0-9]+)\\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$',
    'gm',
);

const packageVersionRex = new RegExp('"version\\s*(.*?)\\s*,', 'g');

export const version = function({ setVersion, excludes, startDir }: VersionOptions): void {
    if (!semVerRex.test(setVersion)) {
        throw new Error('the version you are attempting to set is not a valid semver version');
    }
    const directories = findPackageDirectories(startDir, excludes);
    directories.forEach(function(directory) {
        const filePath = directory + 'package.json';
        console.log(`Setting the version to ${setVersion} in ${filePath}`);
        readFile(filePath, 'utf8', function(err, result) {
            if (err) throw err;
            const updatedPackage = result.replace(packageVersionRex, `"version": "${setVersion}",`);
            writeFile(filePath, updatedPackage, function(err) {
                if (err) throw err;
            });
        });
    });
};
