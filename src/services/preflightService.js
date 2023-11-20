'use strict';

import fs from 'fs';
import out from '../functions/out.js';
import { getSettingsPath, getDataPath } from '../helpers/getPaths.js';

class PreflightService { /* */
    constructor() {
        this.platform = 'unknown';
        this.reject = null;

        this.data = getDataPath();
        this.settings = getSettingsPath();

        return this.run();
    }

    run () {
        return new Promise((resolve, reject) => {
            this.reject = reject;

            this.checkOperatingSystem();
            this.checkSettingsExist();
            this.createDataFile();

            resolve();
        })
    }

    checkOperatingSystem () {
        this.platform = process.platform;

        switch(this.platform) {
            case 'win32':
                return out('running on win32 - run as administrator');
            case 'linux':
                return out('running on linux - run as sudo/root');
            default:
                this.reject('this operating system is not supported');
        }
    }

    checkSettingsExist () {
        if (!fs.existsSync(this.settings)) {
            this.reject(`settings file does not exist at ${this.settings}`);
        }
    }

    createDataFile () {
        try {
            fs.closeSync(fs.openSync(this.data, 'w'));
        } catch (error) {
            this.reject(error);
        }
    }
}

export default PreflightService;
