const http = require('ping')
const constants = require('./constants')
const settings = require('../settings.json')
const { warn, success, error } = require('./logger')

class Preflight {
  constructor () {
    this.remote = ''
    this.s = settings
    this.c = constants
  }

  async runChecks () {
    warn('PFLT | running system integrity checks')

    if (this.s.skip_preflight) {
      warn('PFLT | preflight checks skipped (!)')
    } else {
      await this.verifySettings()
      await this.verifySystem()
      await this.verifyRemoteConnection()
    }

    success('PFLT | system checks carried out successfully')
  }

  async verifySettings () {
    if (!this.s) {
      error('PFLT | the settings.json file does not exist')
    }

    if (!this.s.webserver) {
      error('PFLT | you do not have a webserver configuration block in the settings.json file')
    }

    if (!this.s.webserver.port) {
      warn(`PFLT | you do not have a webserver port selected, so ${this.c.NAME} has defaulted to ${this.c.PORT}`)
    }
  }

  async verifySystem () {
    if (process.platform !== 'linux') {
      error('PFLT | will not run on non-Linux based systems')
    }
  }

  async verifyRemoteConnection () {
    let url = this.c.REMOTE

    if (!this.s.remote) {
      warn(`PFLT | you do not have a remote set up in the settings.json file, so ${this.c.NAME} has defaulted to ${this.c.REMOTE}`)
    } else {
      url = this.s.remote
    }

    http.sys.probe(url, async (active) => {
      if (!active) {
        error('PFLT | The Panel is not active to receive data.')
      } else {
        success('PFLT | established connection with Panel')
      }
    })
  }
}

module.exports = new Preflight()
