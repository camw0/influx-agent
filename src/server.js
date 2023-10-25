const cors = require('cors')
const path = require('path')
const express = require('express')
const Monitor = require('./monitor')
const { error } = require('./logger')
const { DATA_PATH, SETTINGS_PATH } = require('./constants')
const { info } = require('console')

class Server {
  constructor () {
    this.app = express()
    this.monitor = new Monitor()

    this.start()
  }

  async configureRoutes () {
    this.app.get('/', async (_request, response) => {
      this.monitor.collectData()

      try {
        // eslint-disable-next-line n/no-path-concat
        response.sendFile(path.resolve(DATA_PATH))

        info('request served successfully')
      } catch (e) {
        error('unable to handle incoming request: ' + e.message)
      }
    })
  }

  start () {
    this.app.use(cors({
      origin: require(SETTINGS_PATH).remote,
      optionsSuccessStatus: 200
    }))

    this.configureRoutes()

    try {
      this.app.listen(require(SETTINGS_PATH).webserver.port || 3000)
    } catch (e) {
      error('unable to start webserver: ' + e.message)
    }
  }
}

module.exports = Server
