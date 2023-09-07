const http = require('ping');
const constants = require('./constants');
const settings = require('../settings.json');
const { warn, success, error } = require('./logger');

class Preflight {
    constructor() {
        this.remote = '';
        this.s = settings;
        this.c = constants;
    }

    async runChecks () {
        warn('running system integrity checks');

        if (this.s.skip_preflight) {
            warn('preflight checks skipped (!)');
        } else {
            await this.verifySettings();
            await this.verifySystem();
            await this.verifyRemoteConnection();
        }

        success('System checks carried out successfully');
    }

    async verifySettings () {
        if (!this.s) {
            error('The settings.json file does not exist.');
        }

        if (!this.s.webserver) {
            error('You do not have a webserver configuration block in the settings.json file.');
        }

        if (!this.s.webserver.port) {
            warn(`You do not have a webserver port selected, so ${this.c.NAME} has defaulted to ${this.c.PORT}.`);
        }
    }

    async verifySystem () {
        if (process.platform != 'linux') {
            error('This program WILL NOT WORK on non-Linux based systems. Please install a Linux OS before using Influx.');
        }
    }

    async verifyRemoteConnection () {
        let url = this.c.REMOTE;

        if (!this.s.remote) {
            warn(`You do not have a remote set up in the settings.json file, so ${this.c.NAME} has defaulted to ${this.c.REMOTE}.`);
        } else {
            url = this.s.remote;
        }

        http.sys.probe(url, async (active) => {
            if (!active) {
                error('The Panel is not active to receive data.');
            }
        });        
    }
}

module.exports = new Preflight();

