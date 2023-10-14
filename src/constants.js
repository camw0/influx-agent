const PORT = 3000
const VERSION = 'v0.0.1a'
const NAME = 'Influx'
const REMOTE = 'http://localhost:8000'
const DATA_PATH = '/var/lib/influx-agent/data.json'
const SETTINGS_PATH = '/etc/influx-agent/settings.json'

module.exports = { PORT, VERSION, NAME, REMOTE, DATA_PATH, SETTINGS_PATH }
