const getConfig = require('./../functions/getConfig')
const getPages = require('./../functions/getPages')
const buildPages = require('./../functions/buildPages')
const exportPages = require('./../functions/exportPages')

const exportFunc = async (state = {}) => {
    state = await getConfig(state);
    state = await getPages(state);
    state = await buildPages(state);
    state = await exportPages(state);
    return state;
}

module.exports = exportFunc;