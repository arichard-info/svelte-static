const getHooks = (plugins, hook) => {
    if (!hook) {
      throw new Error('A hook ID is required!')
    }
    const hooks = []
    plugins && plugins.forEach(plugin => hooks.push(plugin.hooks[hook]))
    return hooks.filter(Boolean)
  }

const reduceHooks = (hooks) => {
    return (value, options) =>
      hooks.reduce((prev, hook) => {
        const next = hook(prev, options)
        if (next instanceof Promise) {
          throw new Error('Expected hook to return a value, but received promise instead.')
        }
        return typeof next !== 'undefined' ? next : prev
      }, value)
}

module.exports = {
    getHooks,
    reduceHooks
}