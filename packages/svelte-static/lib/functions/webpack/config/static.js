const getCommons = require('./commons')

const getStaticConfig = (state) => {
    const commons = getCommons('static', state);
    return {
        target: "node",
        entry: {
            'export': state.config.paths.coreApp + 'static.js'
        },
        resolve: {
            ...commons.resolve,
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'module', 'main'],
        },
        output: {
            path: state.config.paths.output,
            filename: '[name].js',
            libraryTarget: 'commonjs2',
            chunkFilename: 'export.[name].[id].[contenthash].js',
        },
        module: {
            rules: [...commons.module.svelteRules]
        },
        mode: state.mode === "dev" ? "development" : "production",
        devtool: state.mode === "dev" && 'source-map'
    }
}

module.exports = getStaticConfig