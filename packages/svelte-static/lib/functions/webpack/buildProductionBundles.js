/* eslint-disable import/no-dynamic-require, react/no-danger, import/no-mutable-exports */
const webpack = require('webpack');
const chalk = require('chalk');

const buildWebpackConfig = require('./buildWebpackConfig')
const { time, timeEnd } = require('./../../utils');

async function buildProductionBundles(state) {
	// Build static pages and JSON
	console.log('Bundling App...');
	time(chalk.green('[\u2713] App Bundled'));

	state = await new Promise(async (resolve, reject) => {
		const config = buildWebpackConfig(state);
		webpack(config).run(async (err, stats) => {
			if (err) {
				console.log(chalk.red(err.stack || err));
				if (err.details) {
					console.log(chalk.red(err.details));
				}
				return reject(err);
			}

			stats.toJson('verbose');

			const [prodStats, nodeStats] = stats.stats;

			checkBuildStats('prod', prodStats);
			checkBuildStats('node', nodeStats);

			function checkBuildStats(stage, stageStats) {
				const buildErrors = stageStats.hasErrors();
				const buildWarnings = stageStats.hasWarnings();

				if (buildErrors || buildWarnings) {
					console.log(
						stageStats.toString({
							// context: state.config.context,
							performance: false,
							hash: false,
							timings: true,
							entrypoints: false,
							chunkOrigins: false,
							chunkModules: false,
							colors: chalk.supportsColor,
						})
					);
					if (buildErrors) {
						console.log(
							chalk.red.bold(`
                => There were ERRORS during the ${stage} build stage! :(
                => Fix them and try again!
              `)
						);
					} else if (buildWarnings) {
						console.log(
							chalk.yellow(`
=> There were WARNINGS during the ${stage} build stage. Your site will still function, but you may achieve better performance by addressing the warnings above.
`)
						);
					}
				}
			}
			resolve(state);
		});
	});

	timeEnd(chalk.green('[\u2713] App Bundled'));

	return state;
}

module.exports = buildProductionBundles;
