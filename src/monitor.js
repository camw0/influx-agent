const fs = require('fs')
const { v4 } = require('uuid')
const { error } = require('./logger')
const sys = require('systeminformation')
const { DATA_PATH, VERSION } = require('./constants')

class Monitor {
  async collectData () {
    const data = []

    data.push({
      time: new Date().toLocaleTimeString(),
      version: VERSION,
      uuid: v4(),
      systemLoad: (await sys.currentLoad()),
      cpuInfo: { data: (await sys.cpu()), temperature: (await sys.cpuTemperature()) },
      memoryUsage: (await sys.mem()),
      diskUsage: (await sys.fsSize()),
      networkUsage: (await sys.networkStats())
    })

    this.handleWrite(JSON.stringify(data))
  }

  handleWrite (data) {
    // eslint-disable-next-line n/no-path-concat
    fs.writeFileSync(DATA_PATH, data, 'utf-8', function (err) {
      if (err) error(`unable to write to data file: ${err.message}`)
    })
  }
}

module.exports = Monitor
