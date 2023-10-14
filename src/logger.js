const colors = require('colors')

const success = (message) => {
  return console.info(`${colors.bold.gray(new Date().toLocaleDateString())} ${colors.gray(new Date().toLocaleTimeString())} | ${colors.bold.green('  DONE  ')} | ${message}`)
}

const info = (message) => {
  return console.info(`${colors.bold.gray(new Date().toLocaleDateString())} ${colors.gray(new Date().toLocaleTimeString())} | ${colors.bold.cyan('  INFO  ')} | ${message}`)
}

const warn = (message) => {
  return console.info(`${colors.bold.gray(new Date().toLocaleDateString())} ${colors.gray(new Date().toLocaleTimeString())} | ${colors.bold.yellow('  WARN  ')} | ${message}`)
}

const error = (message) => {
  console.info(`${colors.bold.gray(new Date().toLocaleDateString())} ${colors.gray(new Date().toLocaleTimeString())} ${colors.red('!')} ${colors.bold.red('  FAIL  ')} ${colors.red('!')} ${message}`)
  process.exit();
}

module.exports = { success, info, warn, error }
