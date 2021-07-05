const chalk = require('chalk');

const { time, timeEnd } = require('../../utils');
const { setPageHtml, setPageData } = require('./render')

async function buildPages(state) {
	console.log('build pages...')
    time(chalk.green('[\u2713] Pages built'));

	state.pages = await Promise.all(
		state.pages.map(async (page) => {
			page = await setPageData(page);
			page = await setPageHtml(page, state);
			return page;
		})
	);

	timeEnd(chalk.green('[\u2713] Pages built'));
	return state;
}

module.exports = buildPages
