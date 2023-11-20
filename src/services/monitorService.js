'use strict';

import fs from 'fs';
import { v4 } from 'uuid';
import sys from 'systeminformation';
import { getDataPath } from '../helpers/getPaths.js';
import pkg from '../../package.json' assert { type: "json" };

class MonitorService { /* */
    constructor() {
        this.timer = 0;
        this.reject = null;

        return this.run();
    }

    run () {
        return new Promise(async (resolve, _reject) => {
            let data = [];
            let timer = new Date();

            data.push({
                time: new Date().toLocaleTimeString(),
                version: pkg.version,
                uuid: v4(),
                systemLoad: await sys.currentLoad(),
                cpuInfo: await sys.cpu(),
                memoryUsage: await sys.mem(),
                diskUsage: await sys.fsSize(),
                networkUsage: await sys.networkStats(),
            })

            fs.writeFileSync(getDataPath(), JSON.stringify(data), 'utf-8', (err) => this.reject(err));
            resolve(`${new Date() - timer}ms`);
        })
    }
}

export default MonitorService;
