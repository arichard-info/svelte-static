const fs = require('fs-extra');
const path = require('path');

const preprocessStyle = require('./lib/preprocess-style');
const getGlobalStyleConfig = require('./lib/getGlobalStyleConfig');

const globalStylePath = "/styles/style.js"

const svelteStaticPluginSass = (pluginConfig) => {

    const getEntry = (state) => {
        const entry = path.join(state.config.paths.projectRoot, pluginConfig.entry || 'src/styles/main.scss');
        if (fs.existsSync(entry)) return entry
    }

    return {
        getConfig: (state) => {
            const entry = getEntry(state)
            if (entry) state.config.assets.push({ type: 'style', path: globalStylePath, position: 'head' });
            return state;
        },
        preprocess: (preprocessors) => {
            preprocessors.style.push(preprocessStyle)
            return preprocessors;
        },
        webpack: (webpackConfig, state) => {
            const entry = getEntry(state)
            if (entry) webpackConfig.push(getGlobalStyleConfig(state, { entry, output: globalStylePath }));
            return webpackConfig;
        },
    }
}

module.exports = svelteStaticPluginSass;