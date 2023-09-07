const fs = require('fs');

class Monitor {
    constructor() {

    }

    run () {
        var data = [];

        const cpuUsage = this.pollCpuUsage();
        
        data.push({
            'cpuUsage': cpuUsage
        });

        return this.handleWrite(JSON.stringify(data));
    }

    handleWrite (data) {
        fs.writeFileSync(__dirname + '/../' + 'data.json', data, 'utf-8', function (err) {
            if (err) {
                console.error('An error occured writing to the data JSON file: ' + err);
            }
        });

        console.log(`Data write sequence complete (${new Date().toLocaleTimeString()})`);
    }

    pollCpuUsage () {
        return (Math.random() * 100).toFixed(2);
    }
}

module.exports = new Monitor();
