const chalk = require('chalk')
const moment = require('moment')
const fs = require('fs')
const path = require('path')

const log = (type, message) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const colorFn = getColorFn(type)
  console.log(colorFn(`[${timestamp}] ${type.toUpperCase()}: `) + message)
  writeToFile(`[${timestamp}] ${type.toUpperCase()}: ${message}`)
}

const writeToFile = message => {
  const logFile = path.join(__dirname, 'monitor.log')
  fs.appendFile(logFile, message + '\n', err => {
    if (err) {
      console.error(`Error writing to ${logFile}:`, err)
    }
  })
}

const getColorFn = type => {
  switch (type.toLowerCase()) {
    case 'info':
      return chalk.cyan
    case 'warning':
      return chalk.yellow
    case 'error':
      return chalk.red
    default:
      return chalk.white
  }
}

module.exports = {
  log,
  getColorFn
}
