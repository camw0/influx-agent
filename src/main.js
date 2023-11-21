'use strict';

const execute = require('./functions/execute.js');
const HttpService = require('./services/httpService.js');
const PreflightService = require('./services/preflightService.js');

async function main () {
    // run core services to ensure they are working
    await execute(PreflightService);
    await execute(HttpService);
}

main();
