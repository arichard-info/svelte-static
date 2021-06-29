const plugins = require('./../plugins');
const getStaticConfig = require('./config/static');
const getClientConfig = require('./config/client');


const buildWebpackConfig = (state) => {
    let webpackConfig = [ getClientConfig(state) ];
    if (state.mode === "prod") webpackConfig.push(getStaticConfig(state));
    webpackConfig = plugins.hooks.webpack(webpackConfig, state);
    console.log(webpackConfig)
    return webpackConfig;
}

module.exports = buildWebpackConfig