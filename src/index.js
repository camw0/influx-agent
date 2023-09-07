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

        ServerInstance.serveData(require('../data.json'));
    }, 1000);
}


main();
