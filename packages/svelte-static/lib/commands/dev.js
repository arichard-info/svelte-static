const getConfig = require('./../functions/getConfig')
const getPages = require('./../functions/getPages')
const buildPages = require('./../functions/buildPages')
const devServer = require('./../functions/webpack/devServer')

const dev = async (state = {}) => {
    state.mode = "dev";
    state = await getConfig(state);
    state = await getPages(state);
    state = await buildPages(state);
    state = await devServer(state);
    return state;
}

module.exports = dev;