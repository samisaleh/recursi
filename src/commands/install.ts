import { findPackageDirectories } from '../utils/package-locator';
import { executeSystemCommand } from '../utils/runner';
import rimraf from 'rimraf';
import { BaseOptions } from '..';

interface InstallOptions extends BaseOptions {
    clean: boolean;
}

const cleanLocation = function(location: string): void {
    const locationExtensions = ['node_modules', 'package-lock.json'];
    locationExtensions.forEach(function(extension) {
        rimraf.sync(location + extension);
    });
};

export const install = function({ clean = false, excludes, startDir }: InstallOptions): void {
    const directories = findPackageDirectories(startDir, excludes);

    directories.forEach(function(directory) {
        if (clean) {
            console.log(`Removing existing package lock and modules in ${directory || '/'}`);
            cleanLocation(directory);
        }

        const command = `cd ${directory} && npm i`;
        console.log(`Installing packages in directory ${directory || '/'}`);
        const hasError = executeSystemCommand(command, false);
        if (hasError) {
            throw new Error(hasError);
        }
    });
};
