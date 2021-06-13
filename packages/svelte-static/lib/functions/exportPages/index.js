const chalk = require('chalk');
const { time, timeEnd } = require('../../utils');

const exportPage = require('./exportPage')

async function exportPages(state) {
    console.log('export pages...')
    time(chalk.green('[\u2713] Pages exported'));

    state.pages = await Promise.all(state.pages.map(exportPage))

    timeEnd(chalk.green('[\u2713] Pages exported'));
    return state
}

module.exports = exportPages