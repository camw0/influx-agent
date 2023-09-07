const { success, info, error } = require('./logger');
const fs = require('fs');
const { v4 } = require('uuid');
const sys = require('systeminformation');

class Monitor {
    async run () {
        var data = [];
        
        data.push({
            'time': new Date().toLocaleTimeString(),
            'uuid': v4(),
            'systemLoad': (await sys.currentLoad()),
            'cpuUsage': 50,
            'cpuInfo': { 'data': (await sys.cpu()), 'temperature': (await sys.cpuTemperature()) },
            'memoryUsage': (await sys.mem()),
            'diskUsage': (await sys.fsSize()),
            'networkUsage': (await sys.networkStats()),
        });

        this.handleWrite(JSON.stringify(data));
    }

    handleWrite (data) {
        info('starting write to data.json');
        fs.writeFileSync(__dirname + '/../' + 'data.json', data, 'utf-8', function (err) {
            if (err) {
                error('an error occured writing to the data.json file: ' + err);
            } else {
                success('data copied to data.json successfully')
            }
        });

        success(`data written to data.json successfully`);
    }
}

module.exports = new Monitor();
