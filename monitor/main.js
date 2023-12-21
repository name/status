const path = require('path')
const request = require('request')
const { getMonitorConfig, resetMonitorConfig } = require('./config')
const { log } = require('./logger')

let previousMonitorConfigJson
let monitorConfigJson = getMonitorConfig()
let monitorConfigs = monitorConfigJson.monitors

const monitorDelay = 120 * 1000 // w(s) * 1000(ms)

setInterval(() => {
  previousMonitorConfigJson = monitorConfigJson

  if (previousMonitorConfigJson !== getMonitorConfig()) {
    resetMonitorConfig()
  }

  monitorConfigJson = getMonitorConfig()
  monitorConfigs = monitorConfigJson.monitors

  monitorConfigs.forEach(({ name, url }) => {
    request(url, (error, response) => {
      if (error) {
        log('error', `${name} is down! Error: ${error.message}`)
      } else if (response.statusCode >= 400) {
        log('error', `${name} is down! Status code: ${response.statusCode}`)
      }
    })
  })
}, monitorDelay)
