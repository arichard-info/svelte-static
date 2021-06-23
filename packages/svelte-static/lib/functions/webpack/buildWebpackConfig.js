const { hooks } = require('./../plugins');
const getStaticConfig = require('./config/static');
const getClientConfig = require('./config/client');


const buildWebpackConfig = (state) => {
    let webpackConfig = [ getClientConfig(state) ];
    if (state.mode === "prod") webpackConfig.push(getStaticConfig(state));
    webpackConfig = hooks.webpack(webpackConfig, state)
    return webpackConfig;
}

module.exports = buildWebpackConfig

// getClientConfig(state.config), 
// getStaticConfig(state.config)