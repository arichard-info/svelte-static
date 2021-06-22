const getCommons = require('./commons')

const getClientConfig = (config) => {
    const commons = getCommons('client', config);
	return {
		entry: {
			client: config.paths.coreApp + 'client/index.js',
		},
		resolve: {
            ...commons.resolve,
			extensions: ['.mjs', '.js', '.svelte'],
			mainFields: ['svelte', 'browser', 'module', 'main'],
		},
		output: {
			path: config.paths.output,
			filename: '[name].js',
			chunkFilename: 'client.[name].[id].[contenthash].js',
		},
		module: {
			rules: [...commons.module.svelteRules],
		},
        mode: config.is.dev ? "development" : "production",
        devtool: config.is.dev && 'source-map'
	};
};

module.exports = getClientConfig