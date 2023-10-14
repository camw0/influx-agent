const fs = require('fs')
const constants = require('./constants')
const { warn, error } = require('./logger')
const settings = require(constants.SETTINGS_PATH)

class Preflight {
  async runChecks () {
    if (settings.skip_preflight) return warn('preflight checks skipped')
    
    await this.verifySettings()
    await this.verifySystem()
    await this.regenerateDataFile()
  }

  async verifySettings () {
    if (!settings) {
      error('settings file does not exist')
    }

    if (!this.s.webserver?.port) {
      warn(`webserver port not set`)
    }
  }

  async verifySystem () {
    if (process.platform !== 'linux') {
      error('host system is not running linux')
    }
  }

  async regenerateDataFile () {
    try {
      fs.closeSync(fs.openSync(constants.DATA_PATH, 'w'))
    } catch (err) {
      error(`failed to create data file: ${err.message}`)
    }
  }
}

module.exports = new Preflight()
