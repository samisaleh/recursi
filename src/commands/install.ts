import { findPackageDirectories } from '../utils/package-locator';
import { executeSystemCommand } from '../utils/runner';

interface InstallOptions {
    excludes: string[];
    startDir?: string;
}

export const install = function({ excludes, startDir }: InstallOptions): void {
    const directories = findPackageDirectories(startDir, excludes);

    directories.forEach(function(directory) {
        const command = `cd ${directory} && npm i`;
        console.log(`Installing packages in directory ${directory}`);
        const hasError = executeSystemCommand(command, false);
        if (hasError) {
            throw new Error(hasError);
        }
    });
};
