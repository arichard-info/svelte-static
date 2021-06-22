const { reduceHooks, getHooks } = require('./utils')

const hooks = {
    webpack: state => {
        const hooks = getHooks(state.plugins, 'webpack')
        return reduceHooks(hooks)(state)
    }
}

const validatePlugin = plugin => {
    const validHookKeys = Object.keys(hooks)
    const hookKeys = Object.keys(plugin.hooks)
    const badKeys = hookKeys.filter(key => !validHookKeys.includes(key))
    if (badKeys.length) {
      throw new Error(
        `Unknown plugin hooks: "${badKeys.join(', ')}" found in plugin: ${
          plugin.location
        }`
      )
    }
  }

module.exports = {
    hooks,
    validatePlugin
}