const fs = require('fs')
const colors = require('colors')
const constants = require('./constants')
const { warn, error } = require('./logger')

class Preflight {
  constructor () {
    this.settings = {}

    this.showLogo()

    this.verifySystem()
    this.checkSettings()
    this.createDataFile()
  }

  showLogo () {
    const version = constants.VERSION == 'develop' ? constants.VERSION.yellow : constants.VERSION.green ;
    console.clear();

    console.log('====================================================================\n'.blue)
    console.log(`
  88888888 888b    888 8888888888 888     888     888 Y88b   d88P 
    888    8888b   888 888        888     888     888  Y88b d88P  
    888    88888b  888 888        888     888     888   Y88o88P   
    888    888Y88b 888 8888888    888     888     888    Y888P    
    888    888 Y88b888 888        888     888     888    d888b    
    888    888  Y88888 888        888     888     888   d88888b   
    888    888   Y8888 888        888     Y88b. .d88P  d88P Y88b  
  8888888  888    Y888 888        88888888 "Y88888P"  d88P   Y88b`.blue)
    console.log(`\n  ${version}${colors.grey(' | starting boot process...')}\n`);
    console.log('====================================================================\n'.blue)
  }
 
  verifySystem () {
    if (process.platform !== 'linux') {
      error('host system is not running linux')
    }
  }

  checkSettings () {
    try {
      settings = require(constants.SETTINGS_PATH)
    } catch (_ex) {
      return error('settings.json file does not exist at ' + constants.SETTINGS_PATH);
    }

    if (settings.skip_preflight) return warn('preflight checks skipped')
  }

  createDataFile () {
    try {
      fs.closeSync(fs.openSync(constants.DATA_PATH, 'w'))
    } catch (e) {
      error(`failed to create data file: ${e.message}`)
    }
  }
}

module.exports = Preflight
