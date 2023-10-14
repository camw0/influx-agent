const PORT = 3000
const NAME = 'Influx'
const REMOTE = 'http://localhost:8000'
const DATA_PATH = '/var/lib/influx-agent/data.json'
const SETTINGS_PATH = '/etc/influx-agent/settings.json'
const VERSION = require('../package.json').version || 'UNKWN'

module.exports = { PORT, VERSION, NAME, REMOTE, DATA_PATH, SETTINGS_PATH }
