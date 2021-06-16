const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const getClientConfig = (config) => {
	return {
		entry: {
			client: config.paths.coreApp + 'client/index.js',
		},
		resolve: {
			extensions: ['.mjs', '.js', '.svelte'],
			mainFields: ['svelte', 'browser', 'module', 'main'],
			alias: {
				'@templates': config.paths.templates,
				'@layouts': config.paths.layouts,
			}
		},
		output: {
			path: config.paths.output,
			filename: '[name].js',
			chunkFilename: 'client.[name].[id].[contenthash].js',
		},
		module: {
			rules: [
				{
					test: /\.svelte$/,
					exclude: /node_modules/,
					use: {
						loader: 'svelte-loader',
						options: {
							compilerOptions: {
								hydratable: false,
							},
							emitCss: false,
							hotReload: false,
							hydratable: false,
						},
					},
				},
				{
					// required to prevent errors from Svelte on Webpack 5+
					test: /node_modules\/svelte\/.*\.mjs$/,
					resolve: {
						fullySpecified: false,
					},
				},
			],
		},
		mode,
		devtool: prod ? false : 'source-map',
	};
};

const getWebpackConfig = (config) => getClientConfig(config);

module.exports = getWebpackConfig;
