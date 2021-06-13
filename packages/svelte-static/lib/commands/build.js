const bundle = require('./bundle.js')
const exportFunc = require('./export.js')

const build = async (state = {}) => {
    state = await bundle(state);
    state = await exportFunc(state);
    return state;
}

module.exports = build;