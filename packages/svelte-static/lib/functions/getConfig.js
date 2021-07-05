const path = require('path');
const fs = require('fs-extra');

const { validatePlugin, hooks } = require('./plugins')

const PROJECT_ROOT = path.join(process.cwd());
const DEFAULT_STATIC_CONFIG = 'static.config.js';
const DEFAULT_TEMPLATES_DIR = 'templates';
const DEFAULT_LAYOUTS_DIR = 'layouts';
const STATIC_CONFIG_PATH = path.join(PROJECT_ROOT, DEFAULT_STATIC_CONFIG);

function getConfig(state) {
    let config = require(STATIC_CONFIG_PATH);

    config = {
        is: {
            dev: !!state.dev
        },
        devServer: {
            host: 'localhost',
            port: 3000,
        },

        paths: {
            projectRoot: PROJECT_ROOT,
            staticConfig: STATIC_CONFIG_PATH,
            templates: path.join(PROJECT_ROOT, 'src', DEFAULT_TEMPLATES_DIR),
            layouts: path.join(PROJECT_ROOT, 'src', DEFAULT_LAYOUTS_DIR),
            svelte: path.join(PROJECT_ROOT, 'node_modules', 'svelte'),
            output: path.join(PROJECT_ROOT, 'dist'),
            coreApp: path.join(__dirname, './../app/'),
        },
        plugins: [],
        assets: [],
        ...config
    }
    state = {
        ...state,
        plugins: config.plugins.map(resolvePlugin(config)),
        config
    }
    state = hooks.getConfig(state);
    return state
}

const resolvePlugin = config => pluginLocation => {
    let options = {}
    if (Array.isArray(pluginLocation)) {
        options = pluginLocation[1] || {}
        pluginLocation = pluginLocation[0]
    }

    const location = [
        () => {
            // Allow plugins to be mocked
            return path.resolve(config.paths.projectRoot, 'node_modules', pluginLocation)
        },
      ].reduce((prev, curr) => prev || curr(), null)

    let nodeLocation = path.join(location, 'node.api.js')
    let browserLocation = path.join(location, 'browser.api.js')
    nodeLocation = fs.pathExistsSync(nodeLocation) ? nodeLocation : null
    browserLocation = fs.pathExistsSync(browserLocation) ? browserLocation : null

    let buildPluginHooks = () => ({})

    try {
        // Get the hooks for the node api
        if (nodeLocation) {
            buildPluginHooks = require(nodeLocation)
        } else if (!browserLocation) {
            throw new Error(
                `Could not find a valid node.api.js or browser.api.js plugin file in "${location}"`
            )
        }
        const resolvedPlugin = {
            location,
            nodeLocation,
            browserLocation,
            options,
            hooks: buildPluginHooks(options) || {},
        }
        validatePlugin(resolvedPlugin)
        return resolvedPlugin
    } catch (err) {
        console.error(
            `The following error occurred in the plugin: "${pluginLocation}"`
        )
        throw err
    }
}

module.exports = getConfig