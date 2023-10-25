const DATA_PATH = '/var/lib/influx-agent/data.json'
const SETTINGS_PATH = '/etc/influx-agent/settings.json'
const VERSION = require('../package.json').version || 'UNKWN'

module.exports = { VERSION, DATA_PATH, SETTINGS_PATH }
