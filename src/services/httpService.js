'use strict';

// import cors from 'cors';
const path = require('path');
const express = require('express');
const execute = require('../functions/execute.js');
const MonitorService = require('./monitorService.js');

class HttpService { /* */
    constructor() {
        this.reject = null;
        this.webserver = express();

        return this.run();
    }

    run () {
        return new Promise((resolve, reject) => {
            this.reject = reject;

            this.init();
            this.start(resolve, reject);
        });
    }

    init () {
        try {
            // this.webserver.use(cors());
        } catch (error) {
            this.reject(error);
        }

        this.webserver.get('/', async (_req, res) => {      
            await new MonitorService().run();

            try {
                res.sendFile(path.resolve('./data.json'));
            } catch (error) {
                console.log('oh no: ' + error.stack);
                this.reject(error);
            };
        })
    }

    start (resolve) {
        try {
            this.webserver.listen(3000, () => {
                resolve('listening for requests');
            });
        } catch (error) {
            this.reject(error);
        };
    }
};

module.exports = HttpService;