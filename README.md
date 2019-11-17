# recursi

## A recursive CLI tool for NPM

Note: this tool is not currently published - to use install the source run `npm install` and `npm link`

### Audit

`recursi audit <options>`

| Option | Description |
|-------:|:------------|
| --audit-level \<level\> | the max level to allow before exiting in error (default: "high") |
| --fix | attempt to automatically fix errors (default: false) |  
| --exclude \<dirs\> | comma separated list of directories to exclude |  
| --start-dir \<dir\> | the directory to start in |  

### Install

`recursi install <options>`

| Option | Description |
|-------:|:------------|
| --clean | removes package locks and node modules before installing |
| --exclude \<dirs\> | comma separated list of directories to exclude |  
| --start-dir \<dir\> | the directory to start in |  


Todo:
- build
- test
- version
