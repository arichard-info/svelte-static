const getConfig = require('./../build/getConfig')
const cleanDistDirectory = require('./../build/cleanDistDirectory')
const buildProductionBundles = require('./../build/webpack/buildProductionBundles');

const bundle = async (state = {}) => {
    state = await getConfig(state);
    state = await cleanDistDirectory(state);
    state = await buildProductionBundles(state);
    return state;
}

module.exports = bundle;