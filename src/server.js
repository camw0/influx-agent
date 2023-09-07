const path = require('path');
const express = require('express');
const { webserver } = require('../settings.json');
const { success, info, error } = require('./logger');

class ServerInstance {
    constructor() {
        this.app = express();
        this.port = webserver.port || 3000;
    }

    async serveData () {
        this.app.get('/', (request, response) => {
            info(`request received from ${request.ip}`)
            try {
                response.sendFile(path.resolve(__dirname + '/../data.json'));
            } catch (e) {
                error('unable to handle incoming request: ' + e);
            }
        })
    }

    start () {
        try {
            this.app.listen(this.port, () => {
                success(`server is listening for connections (port ${this.port})`)
            })
        } catch (error) {
            error('unable to start webserver: ' + error.message);
        }
    }
}

module.exports = new ServerInstance();
