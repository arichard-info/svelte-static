const getConfig = require('./../functions/getConfig')
const getPages = require('./../functions/getPages')
const buildPages = require('./../functions/buildPages')
const devServer = require('./../functions/devServer')

const dev = async (state = {}) => {
    state = await getConfig(state);
    state = await getPages(state);
    state = await buildPages(state);
    state = await devServer(state);
    return state;
}

module.exports = dev;