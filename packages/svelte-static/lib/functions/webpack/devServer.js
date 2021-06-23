const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const buildWebpackConfig = require('./buildWebpackConfig')
const htmlTemplate = require('./../buildPages/htmlTemplate');
const { time, timeEnd, findAvailablePort } = require('./../../utils');

let devServer;

async function servePages(state) {
	const intendedPort = Number(state.config.devServer.port);
	const port = await findAvailablePort(intendedPort);
	state.config.devServer.port = port;

	const webpackConfig = buildWebpackConfig(state);

	const devServerConfig = {
		contentBase: [state.config.paths.output],
		publicPath: '/',
		historyApiFallback: true,
		compress: false,
		writeToDisk: true,
		clientLogLevel: 'warning',
		overlay: true,
		stats: 'errors-only',
		noInfo: true,
		...state.config.devServer,
		hotOnly: true,

		before: async (app) => {
			buildDevRoutes = (newState) => {
				state.pages.forEach((page) => {
					app.get(page.path, async (req, res) => {
						const html = htmlTemplate({ html: '', css: '', head: '' });
						res.send(html);
					});
					app.get(page.path === '/' ? '/data.json' : `${page.path}/data.json`, (req, res) => {
						res.json(JSON.parse(page.data));
					});
				});
			};

			buildDevRoutes(state);
			return app;
		},
	};

	let first = true;
	let skipLog = false;
	const startedAt = Date.now();
	const devCompiler = webpack(webpackConfig);

	console.log('Bundling Application...');
	time(chalk.green('[\u2713] Application Bundled'));

	devCompiler.hooks.invalid.tap(
		{
			name: 'Svelte-Static',
		},
		(file, changed) => {
			// If a file is changed within the first two seconds of
			// the server starting, we don't bark about it. Less
			// noise is better!
			skipLog = changed - startedAt < 2000;
			if (!skipLog) {
				console.log('File changed:', file);
				console.log('Updating bundle...');
				time(chalk.green('[\u2713] Bundle Updated'));
			}
		}
	);

	devCompiler.hooks.done.tap(
		{
			name: 'Svelte-Static',
		},
		(stats) => {
			const messages = stats.toJson({}, true);
			const isSuccessful = !messages.errors.length;
			const hasWarnings = messages.warnings.length;

			if (isSuccessful && !skipLog) {
				if (first) {
					// Print out any dev compiler warnings
					if (hasWarnings) {
						console.log(
							chalk.yellowBright(
								`\n[\u0021] There were ${messages.warnings.length} warnings during compilation\n`
							)
						);
						messages.warnings.forEach((message, index) => {
							console.warn(`[warning ${index}]: ${message}\n`);
						});
					}

					timeEnd(chalk.green('[\u2713] Application Bundled'));
					const protocol = state.config.devServer.https ? 'https' : 'http';
					console.log(
						`${chalk.green('[\u2713] App serving at')} ${chalk.blue(
							`${protocol}://${state.config.devServer.host}:${state.config.devServer.port}`
						)}`
					);
				} else {
					timeEnd(chalk.green('[\u2713] Bundle Updated'));
				}
			} else if (!skipLog) {
				console.log(chalk.redBright('[\u274C] Application bundling failed'));
				console.error(chalk.redBright(messages.errors.join('\n')));
				console.warn(chalk.yellowBright(messages.warnings.join('\n')));
			}

			first = false;
		}
	);

	devServer = new WebpackDevServer(devCompiler, devServerConfig);

	await new Promise((resolve, reject) => {
		devServer.listen(port, null, (err) => {
			if (err) {
				console.error(`Listening on ${port} failed: ${err}`);
				return reject(err);
			}
			resolve();
		});
	});

	return state;

	// console.log('export pages...');
	// time(chalk.green('[\u2713] Pages exported'));

	// app.listen(port, () => {
	// 	console.log(`Example app listening at http://localhost:${port}`);
	// });

	// timeEnd(chalk.green('[\u2713] Pages exported'));
	// return state;
}

module.exports = servePages;
