const fs = require('fs')
const path = require('path')
const defaultConfig = {
  monitors: [
    {
      name: 'Example 1',
      url: 'https://example.com'
    },
    {
      name: 'Example 2',
      url: 'https://example.com'
    }
  ]
}

const configPath = path.join(__dirname, 'config.json')
const logPath = path.join(__dirname, 'monitor.log')

fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2))
fs.writeFileSync(logPath, '')

console.log(
  'Monitor configuration and log file have been reset to their default values.'
)
