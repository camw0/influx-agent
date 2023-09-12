const Monitor = require('./monitor')
const Preflight = require('./preflight')
const { info, warn } = require('./logger')
const ServerInstance = require('./server')

console.clear()

async function main () {
  warn('CORE | system is starting boot process, please wait')

  await Preflight.runChecks().then(() => {
    ServerInstance.start()
  })

  info('CORE | all services are online and ready to handle requests')

  setInterval(async () => {
    info('CORE | starting resource poll')
    await Monitor.run()

    await ServerInstance.serveData()

    info('CORE | waiting until next refresh')
  }, 5000)
}

main()
