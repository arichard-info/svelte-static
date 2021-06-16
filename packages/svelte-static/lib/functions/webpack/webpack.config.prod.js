const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const getStaticConfig = (config) => ({
    target: "node",
	entry: {
		'export': config.paths.coreApp + 'static.js'
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'module', 'main'],
		alias: {
			'@templates': config.paths.templates,
			'@layouts': config.paths.layouts,
		}
	},
	output: {
		path: config.paths.output,
		filename: '[name].js',
		libraryTarget: 'commonjs2',
		chunkFilename: 'export.[name].[id].[contenthash].js',
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
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
})

const getClientConfig = (config) => ({
	entry: {
		'client': config.paths.coreApp + 'client/index.js'
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
})

module.exports = { getClientConfig, getStaticConfig };