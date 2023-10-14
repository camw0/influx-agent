const Monitor = require('./monitor')
const { info } = require('./logger')
const ServerInstance = require('./server')
const { runChecks } = require('./preflight')

async function boot () {
  await runChecks().then(() => ServerInstance.start())

  info('all services are online and ready to handle requests')

  setInterval(async () => {
    await Monitor.run()

    await ServerInstance.serveData()
  }, 1000)
}

boot()
