import program, { Command } from 'commander';
import { version } from './app-version.json';
import { audit, install } from './commands';

program.version(version);

const parseExcludes = function(exclude: string): string[] {
    return exclude?.split(',').map((exclusion: string) => exclusion.trim()) || [];
};

// AUDIT
program
    .command('audit')
    .option('--audit-level <level>', 'the max level to allow without exiting in error', 'high')
    .option('--exclude <dirs>', 'comma separated list of directories to exclude')
    .option('--start-dir <level>', 'the directory to start in')
    .action(function({ auditLevel, exclude, startDir }: Command) {
        const excludes = parseExcludes(exclude);
        audit({ auditLevel, excludes, startDir });
    });

// INSTALL
program
    .command('install')
    .option('--exclude <dirs>', 'comma separated list of directories to exclude')
    .option('--start-dir <level>', 'the directory to start in')
    .action(function({ exclude, startDir }: Command) {
        const excludes = parseExcludes(exclude);
        install({ excludes, startDir });
    });

program.parse(process.argv);
