const getConfig = require('./../build/getConfig')
const getPages = require('./../build/getPages')
const buildPages = require('./../build/buildPages')
const exportPages = require('./../build/exportPages')

const exportFunc = async (state = {}) => {
    state = await getConfig(state);
    state = await getPages(state);
    state = await buildPages(state);
    state = await exportPages(state);
    return state;
}

module.exports = exportFunc;