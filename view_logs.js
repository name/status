// start reading the log file under monitors/monitor.log and wait for new lines to be added

const fs = require('fs')
const path = require('path')

const logPath = path.join(__dirname, 'monitor/monitor.log')

fs.watchFile(logPath, () => {
  const log = fs.readFileSync(logPath, 'utf8')
  const lines = log.trim().split('\n')
  const lastLine = lines[lines.length - 1]
  console.log(lastLine)
})
