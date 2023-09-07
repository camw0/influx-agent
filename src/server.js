const path = require('path');
const express = require('express');
const { webserver } = require('../settings.json');

class ServerInstance {
    constructor() {
        this.app = express();
        this.port = webserver.port || 3000;
    }

    serveData () {
        this.app.get('/', (_request, response) => {
            response.sendFile(path.resolve(__dirname + '/../data.json'));
        })
    }

    start () {
        try {
            this.app.listen(this.port, () => {
                console.log(`Webserver is listening for connections (${this.port})`)
            })
        } catch (error) {
            throw new Error('Unable to start webserver: ' + error.message);
        }

        this.app.use((req, res, next) => {
            res.set('Cache-Control', 'no-store')
            next()
          })
    }
}

module.exports = new ServerInstance();
