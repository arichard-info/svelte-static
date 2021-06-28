const fs = require('fs-extra');
const path = require('path');

const preprocessStyle = require('./lib/preprocess-style');
const getGlobalStyleConfig = require('./lib/getGlobalStyleConfig');

const svelteStaticPluginSass = (pluginConfig) => ({
    preprocess: (preprocessors) => {
        preprocessors.style.push(preprocessStyle)
        return preprocessors;
    },
    webpack: (webpackConfig, state) => {
        const entry = path.join(state.config.paths.projectRoot, pluginConfig.entry || 'src/styles/main.scss');
        if(fs.existsSync(entry)) webpackConfig.push(getGlobalStyleConfig(state, { entry }))
        return webpackConfig;
    }
})

module.exports = svelteStaticPluginSass;