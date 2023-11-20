'use strict';

// import cors from 'cors';
import path from 'path';
import express from 'express';
import execute from '../functions/execute.js';
import MonitorService from './monitorService.js';

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
            await execute(MonitorService);

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

export default HttpService;
