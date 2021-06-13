function getConfig(state) {
    const config = {
        devServer: {
            host: 'localhost',
            port: 3000,
        }
    }
    state.config = config;
    return state
}

module.exports = getConfig