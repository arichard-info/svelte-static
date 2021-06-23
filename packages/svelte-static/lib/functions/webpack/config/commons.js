module.exports = (type, state) => ({
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