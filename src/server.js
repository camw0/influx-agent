const path = require('path')
const express = require('express')
const { success, warn, error } = require('./logger')
const { DATA_PATH, SETTINGS_PATH } = require('./constants')
const { webserver } = require(SETTINGS_PATH)

class ServerInstance {
  constructor () {
    this.app = express()
    this.port = webserver.port || 25565
  }

  async serveData () {
    this.app.get('/', (request, response) => {
      const start = Date.now()
      warn(`WSRV | request received from ${request.ip}`)
      try {
        // eslint-disable-next-line n/no-path-concat
        response.sendFile(path.resolve(DATA_PATH))
      } catch (e) {
        error('WSRV | unable to handle incoming request: ' + e)
      }

      success(`WSRV | request processed in ${Date.now() - start}ms`)
    })
  }

  start () {
    try {
      this.app.listen(this.port, () => {
        success(`WSRV | listening for connections (port ${this.port})`)
      })
    } catch (error) {
      error('WSVR | unable to start webserver: ' + error.message)
    }
  }
}

module.exports = new ServerInstance()
