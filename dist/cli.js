#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const app_version_json_1 = require("./app-version.json");
const commands = __importStar(require("./commands"));
commander_1.default.version(app_version_json_1.version);
console.log(`Recursi version ${app_version_json_1.version}\n`);
const parseExcludes = function (exclude) {
    var _a;
    return ((_a = exclude) === null || _a === void 0 ? void 0 : _a.split(',').map((exclusion) => exclusion.trim())) || [];
};
const setBaseOptions = function (programInstance) {
    programInstance
        .option('--exclude <dirs>', 'comma separated list of directories to exclude')
        .option('--start-dir <dir>', 'the directory to start in');
};
const auditCommand = commander_1.default
    .command('audit')
    .description('recursive audit with the ability to set the max audit level error')
    .option('--audit-level <level>', 'the max level to allow before exiting in error', 'high')
    .option('--fix', 'attempt to automatically fix errors', false)
    .action(function ({ auditLevel, exclude, fix, startDir }) {
    const excludes = parseExcludes(exclude);
    commands.audit({ auditLevel, excludes, fix, startDir });
});
setBaseOptions(auditCommand);
const installCommand = commander_1.default
    .command('install')
    .description('recursive install with added options to purge dependencies before installing')
    .option('--clean', 'removes package locks and node modules before installing')
    .action(function ({ clean, exclude, startDir }) {
    const excludes = parseExcludes(exclude);
    commands.install({ clean, excludes, startDir });
});
setBaseOptions(installCommand);
const versionCommand = commander_1.default
    .command('version')
    .description('recursively sets the version of all the package files it finds')
    .requiredOption('--set-version <version>', 'the version to set - must use the semantic scheme')
    .action(function ({ setVersion, exclude, startDir }) {
    const excludes = parseExcludes(exclude);
    commands.version({ setVersion, excludes, startDir });
});
setBaseOptions(versionCommand);
commander_1.default.parse(process.argv);
//# sourceMappingURL=cli.js.map