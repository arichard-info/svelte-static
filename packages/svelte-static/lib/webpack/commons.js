module.exports = (type, config) => ({
    resolve: {
        alias: {
            '@templates': config.paths.templates,
            '@layouts': config.paths.layouts,
			'svelte': config.paths.svelte
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
							hydratable: !config.is.dev
						},
						emitCss: false,
						hotReload: type === "client" && config.is.dev,
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
})