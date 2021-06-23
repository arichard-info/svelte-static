const svelteStaticPluginSass = (config) => {
    webpack: (webpackConfig, state) => {
        return webpackConfig;
    }
}

module.exports = svelteStaticPluginSass;