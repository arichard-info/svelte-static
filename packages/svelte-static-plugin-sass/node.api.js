const preprocessStyle = require('./lib/preprocess-style')

const svelteStaticPluginSass = (pluginConfig) => ({
    preprocess: (preprocessors) => {
        preprocessors.style.push(preprocessStyle)
    },
    webpack: (webpackConfig, state) => {
        if(Array.isArray(webpackConfig)) {
            return webpackConfig.map(config => {
                // if(config.module && config.module.rules ) {
                //     config.module.rules = config.module.rules.map(rule => {
                //         if(rule && rule.use && rule.use.loader === "svelte-loader") {
                //             rule = {
                //                 ...rule,
                //                 use: {
                //                     ...rule.use,
                //                     options: {
                //                         ...rule.options,
                //                         preprocess: {
                //                             style: preprocessStyle
                //                         }
                //                     }
                //                 }

                //             }
                //         }

                //         return rule;
                //     })
                // }

                return config;
            })
        }
        return webpackConfig;
    }
})

module.exports = svelteStaticPluginSass;