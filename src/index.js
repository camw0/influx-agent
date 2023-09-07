const fs = require('fs');
const Monitor = require('./monitor');
const Preflight = require('./preflight');
const ServerInstance = require('./server');

async function main () {
    await Preflight.runChecks().then(() => {
        ServerInstance.start();
    });

    console.log('All services are ready to send/receive data to Panel');

    setInterval(() => {
        Monitor.run()

        fs.readFile(__dirname + '/../data.json', 'utf-8', (error, data) => {
            if (error) console.error(error);

            console.log(data);
            ServerInstance.serveData(data);
        })
        
    }, 1000);
}


main();
