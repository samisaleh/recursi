#!/usr/bin/env node
import program, { Command } from 'commander';
import { version } from './app-version.json';
import * as commands from './commands';

program.version(version);

console.log(`Recursi version ${version}\n`);

const parseExcludes = function(exclude: string): string[] {
    return exclude?.split(',').map((exclusion: string): string => exclusion.trim()) || [];
};

export interface BaseOptions {
    excludes: string[];
    startDir?: string;
}

const setBaseOptions = function(programInstance: Command): void {
    programInstance
        .option('--exclude <dirs>', 'comma separated list of directories to exclude')
        .option('--start-dir <dir>', 'the directory to start in');
};

// AUDIT
const auditCommand = program
    .command('audit')
    .description('recursive audit with the ability to set the max audit level error')
    .option('--audit-level <level>', 'the max level to allow before exiting in error', 'high')
    .option('--fix', 'attempt to automatically fix errors', false)
    .action(function({ auditLevel, exclude, fix, startDir }: Command) {
        const excludes = parseExcludes(exclude);
        commands.audit({ auditLevel, excludes, fix, startDir });
    });

setBaseOptions(auditCommand);

// INSTALL
const installCommand = program
    .command('install')
    .description('recursive install with added options to purge dependencies before installing')
    .option('--clean', 'removes package locks and node modules before installing')
    .action(function({ clean, exclude, startDir }: Command) {
        const excludes = parseExcludes(exclude);
        commands.install({ clean, excludes, startDir });
    });

setBaseOptions(installCommand);

// INSTALL
const versionCommand = program
    .command('version')
    .description('recursively sets the version of all the package files it finds')
    .requiredOption('--set-version <version>', 'the version to set - must use the semantic scheme')
    .action(function({ setVersion, exclude, startDir }: Command) {
        const excludes = parseExcludes(exclude);
        commands.version({ setVersion, excludes, startDir });
    });

setBaseOptions(versionCommand);

program.parse(process.argv);
