const Monitor = require('./monitor')
const Preflight = require('./preflight')
const { info, warn } = require('./logger')
const ServerInstance = require('./server')

console.clear()

async function main () {
  warn('system is starting boot process, please wait')

  await Preflight.runChecks().then(() => {
    ServerInstance.start()
  })

  info('all services are online and ready to handle requests')

  setInterval(async () => {
    info('starting resource poll')
    await Monitor.run()

    await ServerInstance.serveData()

    info('waiting until next refresh')
  }, 5000)
}

main()
