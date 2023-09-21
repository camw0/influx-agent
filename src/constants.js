const PORT = 3000
const NAME = 'Influx'
const REMOTE = 'http://localhost:8000'
const DATA_PATH = '/var/lib/influx-agent/data.json'
const SETTINGS_PATH = '/etc/influx-agent/settings.json'

module.exports = { PORT, NAME, REMOTE, DATA_PATH, SETTINGS_PATH }
