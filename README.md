# recursi

## A recursive CLI tool for NPM

Note: this tool is not currently published - to use install the source run `npm install`, `npm run build` and `npm link`

### Audit

`recursi audit <options>`

| Option | Description |
|-------:|:------------|
| --audit-level \<level\> | the max level to allow before exiting in error (default: "high") |
| --fix | attempt to automatically fix errors (default: false) |  
| --exclude \<dirs\> | comma separated list of directories to exclude |  
| --start-dir \<dir\> | the directory to start in |  
| -h, --help | output usage information |  

### Install

`recursi install <options>`

| Option | Description |
|-------:|:------------|
| --clean | removes package locks and node modules before installing |
| --exclude \<dirs\> | comma separated list of directories to exclude |  
| --start-dir \<dir\> | the directory to start in |  
| -h, --help | output usage information |  

### Version

`recursi version <options>`

| Option | Description |
|-------:|:------------|
| --set-version <version> | the version to set - must use the semantic scheme |
| --exclude \<dirs\> | comma separated list of directories to exclude |  
| --start-dir \<dir\> | the directory to start in |  
| -h, --help | output usage information |  

Todo:
- add access to default args for npm commands
- build command
- custom commands
- test command
