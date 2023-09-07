const fs = require('fs');
const os = require('os');
const sys = require('systeminformation');

class Monitor {
    async run () {
        var data = [];
        
        data.push({
            'time': new Date().toLocaleTimeString(),
            'systemLoad': (await sys.currentLoad()),
            'cpuUsage': await this.pollCpu(),
            'cpuInfo': await this.pollCpuInfo(),
            'memoryUsage': await this.pollMemory(),
            'diskUsage': (await sys.fsSize()),
            'networkUsage': (await sys.networkStats()),
        });

        this.handleWrite(JSON.stringify(data));
    }

    handleWrite (data) {
        fs.writeFileSync(__dirname + '/../' + 'data.json', data, 'utf-8', function (err) {
            if (err) {
                console.error('An error occured writing to the data JSON file: ' + err);
            }
        });

        console.log(`Data write sequence complete (${new Date().toLocaleTimeString()})`);
    }

    async pollCpu () {
        return 50;
    }

    async pollCpuInfo () {
        return {
            'data': (await sys.cpu()),
            'temperature': (await sys.cpuTemperature())
        }
    }

    async pollMemory () {
        const memory = (await sys.mem());
    
        return {
            'total': memory.total,
            'used': memory.used,
            'free': memory.free,
            'percentageUsed': parseFloat(((memory.used / memory.total) * 100).toFixed(2)),
            'swap': {
                'total': memory.swaptotal,
                'used': memory.swapused,
                'free': memory.swapfree
            }
        };
    }
}

module.exports = new Monitor();
