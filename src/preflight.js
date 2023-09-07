const http = require('ping');
const constants = require('./constants');
const settings = require('../settings.json');

class Preflight {
    constructor() {
        this.remote = '';
        this.s = settings;
        this.c = constants;
    }

    async runChecks () {
        console.log('Running system integrity checks, please wait...');

        if (this.s.skip_preflight) {
            console.warn('Preflight checks skipped (BE CAREFUL!)');
        } else {
            await this.verifySettings();
            await this.verifySystem();
            await this.verifyRemoteConnection();
        }

        console.log('System checks carried out successfully');
    }

    async verifySettings () {
        if (!this.s) {
            throw new Error('The settings.json file does not exist.');
        }

        if (!this.s.webserver) {
            throw new Error('You do not have a webserver configuration block in the settings.json file.');
        }

        if (!this.s.webserver.port) {
            console.warn(`You do not have a webserver port selected, so ${this.c.NAME} has defaulted to ${this.c.PORT}.`);
        }
    }

    async verifySystem () {
        //
    }

    async verifyRemoteConnection () {
        let url = this.c.REMOTE;

        if (!this.s.remote) {
            console.warn(`You do not have a remote set up in the settings.json file, so ${this.c.NAME} has defaulted to ${this.c.REMOTE}.`);
        } else {
            url = this.s.remote;
        }

        http.sys.probe(url, async (active) => {
            if (!active) {
                throw new Error('The Panel is not active to receive data.');
            }
        });        
    }
}

module.exports = new Preflight();

