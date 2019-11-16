import { findPackageDirectories } from '../utils/package-locator';
import { executeSystemCommand } from '../utils/runner';

interface AuditOptions {
    auditLevel: string;
    excludes: string[];
    startDir?: string;
}

const auditLevels = ['low', 'moderate', 'high', 'critical'];

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

export const audit = function({ auditLevel, excludes, startDir }: AuditOptions): void {
    const directories = findPackageDirectories(startDir, excludes);

    directories.forEach(function(directory) {
        const command = `cd ${directory} && npm audit --parseable`;
        console.log(`Auditing directory ${directory}`);
        const hasError = executeSystemCommand(command);

        if (hasError) {
            checkIfLevelFound(hasError, auditLevel);
        }
    });
};
