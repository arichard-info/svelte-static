const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
const { time, timeEnd } = require('../utils')

async function cleanDistDirectory(state) {
  // Remove the DIST folder
  console.log('Cleaning dist...')
  time(chalk.green('[\u2713] Dist cleaned'))
  await fs.remove(path.resolve('dist'))
  timeEnd(chalk.green('[\u2713] Dist cleaned'))

  return state
}

module.exports = cleanDistDirectory