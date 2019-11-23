import fg from 'fast-glob';

export const findPackageDirectories = function(startDir = './', excludes: string[]): string[] {
    const filePattern = `**/package.json`;
    const packageLocations = fg.sync(filePattern, {
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
