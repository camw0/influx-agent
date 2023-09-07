const colors = require('colors')

const date = `${colors.bold.gray(new Date().toLocaleDateString())} ${colors.gray(new Date().toLocaleTimeString())}`

const success = (message) => {
  return console.info(`${date} | ${colors.bold.green('  DONE  ')} | ${message}`)
}

const info = (message) => {
  return console.info(`${date} | ${colors.bold.cyan('  INFO  ')} | ${message}`)
}

const warn = (message) => {
  return console.info(`${date} | ${colors.bold.yellow('  WARN  ')} | ${message}`)
}

const error = (message) => {
  return console.info(`${date} ${colors.red('!')} ${colors.bold.red('  ERROR  ')} ${colors.red('!')} ${message}`)
}

module.exports = { success, info, warn, error }
