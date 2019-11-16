const { version } = require('../package.json');
const { writeFileSync } = require('fs');

writeFileSync('./src/app-version.json', JSON.stringify({version}));
console.log(`App version set to ${version}`);