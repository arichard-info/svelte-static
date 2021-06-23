const getConfig = require('./../functions/getConfig')
const cleanDistDirectory = require('./../functions/cleanDistDirectory')
const buildProductionBundles = require('../functions/webpack/buildProductionBundles');

const bundle = async (state = {}) => {
    state.mode = "prod";
    state = await getConfig(state);
    state = await cleanDistDirectory(state);
    state = await buildProductionBundles(state);
    return state;
}

module.exports = bundle;