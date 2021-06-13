const { performance } = require('perf_hooks')
const PortFinder = require('portfinder')

const times = {}

function time(message) {
  times[message] = performance.now() / 1000
}

function timeEnd(message) {
  if (times[message]) {
    let seconds = (performance.now() / 1000 - times[message]) * 10
    times[message] = null

    if (seconds < 0.1) {
      console.log(`${message}`)
      return
    }

    if (seconds < 1) {
      seconds = Math.round(seconds * 10) / 10
    } else {
      seconds = Math.round(seconds) / 10
    }
    console.log(`${message} (${seconds}s)`)
  }
}

function findAvailablePort(start = 3000){
  return PortFinder.getPortPromise({
    port: start,
    stopPort: start + 1000,
  })
}


module.exports = {
    time, timeEnd, findAvailablePort
}