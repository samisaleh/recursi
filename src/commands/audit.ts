import { findPackageDirectories } from '../utils/package-locator';
import { executeSystemCommand } from '../utils/runner';
import { BaseOptions } from '../cli';

interface AuditOptions extends BaseOptions {
    auditLevel: string;
    fix: boolean;
}

const auditLevels: string[] = ['low', 'moderate', 'high', 'critical'];

const checkIfLevelFound = function(errors: string, auditLevel: string) {
    const levelIndex = auditLevels.indexOf(auditLevel);
    const errorLevels = auditLevels.filter((level, index) => index >= levelIndex);

    errors.split('\n').forEach(function(err) {
        const line = err.replace(/\n/g, '');
        const level = line.split('\t')[2];
        if (errorLevels.includes(level)) {
            throw new Error(line);
        }
        line && console.warn(line);
    });
};

export const audit = function({ auditLevel, excludes, fix, startDir }: AuditOptions): void {
    const directories = findPackageDirectories(startDir, excludes);
    const fixCommand = (fix && 'fix') || '';

    directories.forEach(function(directory) {
        const command = `cd ${directory} && npm audit --parseable ${fixCommand}`;

        console.log(`Auditing directory ${directory || '/'}`);
        const hasError = executeSystemCommand(command);

        if (hasError && fix) {
            throw new Error(hasError);
        }

        if (hasError) {
            checkIfLevelFound(hasError, auditLevel);
        }
    });
};
