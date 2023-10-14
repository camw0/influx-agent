const Monitor = require('./monitor')
const { info } = require('./logger')
const Preflight = require('./preflight')
const ServerInstance = require('./server')

async function boot () {
  await Preflight.runChecks().then(() => ServerInstance.start())

  info('all services are online and ready to handle requests')

  setInterval(async () => {
    await Monitor.run()

    await ServerInstance.serveData()
  }, 1000)
}

boot()
