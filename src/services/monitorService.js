'use strict';

const fs = require('fs');
const { v4 } = require('uuid');
const sys = require('systeminformation');
const { version } = require('../../package.json');
const { getDataPath } = require('../helpers/getPaths.js');

class MonitorService { /* */
    constructor() {
        this.timer = 0;
        this.reject = null;
    }

    async run () {
        let data = [];
        let timer = new Date();

        data.push({
            time: new Date().toLocaleTimeString(),
            version: version,
            uuid: v4(),
            systemLoad: await sys.currentLoad(),
            cpuInfo: await sys.cpu(),
            memoryUsage: await sys.mem(),
            diskUsage: await sys.fsSize(),
            networkUsage: await sys.networkStats(),
        });

        fs.writeFileSync(getDataPath(), JSON.stringify(data), 'utf-8', (err) => this.reject(err));
        resolve(`${new Date() - timer}ms`);
    }
}

module.exports = MonitorService;
