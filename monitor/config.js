// config.js
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
const { log } = require('./logger')

const monitorConfigPath = path.join(__dirname, 'config.json')
let previousMonitorConfigJson
let previousMonitorConfigHash

const getMonitorConfig = () => {
  try {
    const monitorConfigData = fs.readFileSync(monitorConfigPath, 'utf8')
    const newMonitorConfigJson = JSON.parse(monitorConfigData)
    const newMonitorConfigHash = md5(monitorConfigData)

    if (newMonitorConfigHash !== previousMonitorConfigHash) {
      log('info', 'Configuration file has changed.')
      if (previousMonitorConfigJson) {
        printConfigurationChanges(
          previousMonitorConfigJson,
          newMonitorConfigJson
        )
      }
      previousMonitorConfigJson = newMonitorConfigJson
      previousMonitorConfigHash = newMonitorConfigHash
    }

    return newMonitorConfigJson
  } catch (error) {
    log('error', `Failed to read the configuration file: ${error}`)
    process.exit(1)
  }
}

const printConfigurationChanges = (prevConfig, newConfig) => {
  const prevMonitors = prevConfig.monitors
  const newMonitors = newConfig.monitors

  const addedMonitors = newMonitors.filter(
    newMonitor =>
      !prevMonitors.some(prevMonitor => prevMonitor.name === newMonitor.name)
  )

  const removedMonitors = prevMonitors.filter(
    prevMonitor =>
      !newMonitors.some(newMonitor => newMonitor.name === prevMonitor.name)
  )

  const updatedMonitors = prevMonitors.filter(prevMonitor => {
    const newMonitor = newMonitors.find(newM => newM.name === prevMonitor.name)
    return newMonitor && newMonitor.url !== prevMonitor.url
  })

  log('info', 'Configuration changes:')
  log('info', `  Added ${addedMonitors.length} monitor(s):`)
  addedMonitors.forEach(monitor => log('info', `    - ${monitor.name}`))

  log('info', `  Removed ${removedMonitors.length} monitor(s):`)
  removedMonitors.forEach(monitor => log('info', `    - ${monitor.name}`))

  log('info', `  Updated ${updatedMonitors.length} monitor(s):`)
  updatedMonitors.forEach(monitor =>
    log('info', `    - ${monitor.name} (URL changed)`)
  )
}

const resetMonitorConfig = () => {
  previousMonitorConfigJsonReset = null
  previousMonitorConfigHashReset = null
}

module.exports = {
  getMonitorConfig,
  printConfigurationChanges,
  resetMonitorConfig
}
