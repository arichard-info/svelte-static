const getConfig = require('./../functions/getConfig')
const cleanDistDirectory = require('./../functions/cleanDistDirectory')
const buildProductionBundles = require('./../functions/buildProductionBundles');

const bundle = async (state = {}) => {
    state = await getConfig(state);
    state = await cleanDistDirectory(state);
    state = await buildProductionBundles(state);
    return state;
}

module.exports = bundle;