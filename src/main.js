'use strict';

import execute from './functions/execute.js';
import HttpService from './services/httpService.js';
import PreflightService from './services/preflightService.js';

async function main () {
    // run core services to ensure they are working
    await execute(PreflightService);
    await execute(HttpService);
}

main();
