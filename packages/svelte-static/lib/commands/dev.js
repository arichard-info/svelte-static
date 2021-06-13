const getConfig = require('./../build/getConfig')
const getPages = require('./../build/getPages')
const buildPages = require('./../build/buildPages')
const devServer = require('./../build/webpack/devServer')

const dev = async (state = {}) => {
    state = await getConfig(state);
    state = await getPages(state);
    state = await buildPages(state);
    state = await devServer(state);
    return state;
}

module.exports = dev;