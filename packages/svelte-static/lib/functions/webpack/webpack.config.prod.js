const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const outputPath = path.join(__dirname, '/../../../../../../dist');
const appPath = path.join(__dirname, './../../app/')

const static = {
    target: "node",
	entry: {
		'export': appPath + 'static.js'
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'module', 'main'],
	},
	output: {
		path: outputPath,
		filename: '[name].js',
		libraryTarget: 'commonjs2',
		chunkFilename: 'export.[name].[id].[contenthash].js',
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				// exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							generate: "ssr",
							hydratable: false
						},
						emitCss: false,
						hotReload: false,
						hydratable: false,
					}
				}
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	mode,
	devtool: prod ? false : 'source-map'
};

const client = {
	entry: {
		'client': appPath + 'client/index.js'
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
	},
	output: {
		path: outputPath,
		filename: '[name].js',
		chunkFilename: 'client.[name].[id].[contenthash].js',
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				// exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							hydratable: true,
						},
						emitCss: false,
						hotReload: false,
						hydratable: true,
					}
				}
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	mode,
	devtool: prod ? false : 'source-map'
}

module.exports = [client, static];