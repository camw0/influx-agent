const Server = require('./server')
const { info } = require('./logger')
const Preflight = require('./preflight')

async function main() {
  await new Preflight().then(() => new Server())

  info('all services are online and ready to handle requests')
}

main()
