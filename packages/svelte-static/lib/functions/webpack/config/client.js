const getCommons = require('./commons')

const getClientConfig = (state) => {
    const commons = getCommons('client', state);
	return {
		entry: {
			client: state.config.paths.coreApp + 'client/index.js',
		},
		resolve: {
            ...commons.resolve,
			extensions: ['.mjs', '.js', '.svelte'],
			mainFields: ['svelte', 'browser', 'module', 'main'],
		},
		output: {
			path: state.config.paths.output,
			filename: '[name].js',
			chunkFilename: 'client.[name].[id].[contenthash].js',
		},
		module: {
			rules: [...commons.module.svelteRules],
		},
        mode: state.mode === "dev" ? "development" : "production",
        devtool: state.mode === "dev" && 'source-map'
	};
};

module.exports = getClientConfig