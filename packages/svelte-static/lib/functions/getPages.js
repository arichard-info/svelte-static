const chalk = require('chalk');
const { time, timeEnd } = require('../utils');
const datasources = require('./../datasources')

async function getPages(state) {
    console.log('get pages...');
	time(chalk.green('[\u2713] Pages fetched'));
    const { getPages: getExportPages, App } = await require('./../../../../dist/export');
    let pages = await getExportPages({ datasources });

    pages = await Promise.all(pages.map(async page => {
        page.template.componentModule = await page.template.getModule();
        page.layout.componentModule = await page.layout.getModule();
        return page;
    }))

    state.pages = pages;
    state.App = App;
    timeEnd(chalk.green('[\u2713] Pages fetched'));
    return state
}

module.exports = getPages