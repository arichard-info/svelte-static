const path = require('path')

const DEFAULT_STATIC_CONFIG = 'static.config.js'

function getConfig(state) {
    const config = {
        devServer: {
            host: 'localhost',
            port: 3000,
        },
        paths: {
            STATIC_CONFIG: path.join(process.cwd(), DEFAULT_STATIC_CONFIG)
        }
    }
    state.config = config;
    return state
}

module.exports = getConfig