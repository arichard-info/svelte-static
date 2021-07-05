const plugins = require('./../../plugins')

const reducePreprocessor = preprocessors => params => 
	preprocessors.reduce((content, preprocessor) => preprocessor({ ...params, content }), params.content)

module.exports = (type, state) => {
	let preprocessors = { style: [], markup: [], script: [] }
	preprocessors = plugins.hooks.preprocess(preprocessors, state);
	Object.keys(preprocessors).forEach(key => {
		if (!preprocessors[key].length) delete preprocessors[key];
		else preprocessors[key] = reducePreprocessor(preprocessors[key])
	})

	return {
		resolve: {
			alias: {
				'@templates': state.config.paths.templates,
				'@layouts': state.config.paths.layouts,
				'svelte': state.config.paths.svelte
			}
		},
		module: {
			svelteRules: [
				{
					test: /\.svelte$/,
					use: {
						loader: 'svelte-loader',
						options: {
							compilerOptions: {
								generate: type === "static" ? "ssr" : undefined,
								hydratable: !(state.mode === "dev")
							},
							emitCss: false,
							hotReload: type === "client" && state.mode === "dev",
							preprocess: preprocessors
						}
					}
				},
				{
					// required to prevent errors from Svelte on Webpack 5+
					test: /node_modules\/svelte\/.*\.mjs$/,
					resolve: { fullySpecified: false }
				}
			]
		}
	}
}