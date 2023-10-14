const cors = require('cors')
const path = require('path')
const express = require('express')
const { error } = require('./logger')
const { DATA_PATH, SETTINGS_PATH } = require('./constants')

class ServerInstance {
  constructor () {
    this.app = express()
  }

  async serveData () {
    this.app.get('/', (_request, response) => {
      try {
        // eslint-disable-next-line n/no-path-concat
        response.sendFile(path.resolve(DATA_PATH))
      } catch (e) {
        error('unable to handle incoming request: ' + e.message)
      }

    })
  }

  start () {
    this.app.use(cors())

    try {
      this.app.listen(require(SETTINGS_PATH).webserver.port || 3000);
    } catch (e) {
      error('unable to start webserver: ' + e.message)
    }
  }
}

module.exports = new ServerInstance()
