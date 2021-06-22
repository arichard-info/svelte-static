const getCommons = require('./commons')

const getStaticConfig = (config) => {
    const commons = getCommons('static', config);
    return {
        target: "node",
        entry: {
            'export': config.paths.coreApp + 'static.js'
        },
        resolve: {
            ...commons.resolve,
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'module', 'main'],
        },
        output: {
            path: config.paths.output,
            filename: '[name].js',
            libraryTarget: 'commonjs2',
            chunkFilename: 'export.[name].[id].[contenthash].js',
        },
        module: {
            rules: [...commons.module.svelteRules]
        },
        mode: config.is.dev ? "development" : "production",
        devtool: config.is.dev && 'source-map'
    }
}

module.exports = getStaticConfig