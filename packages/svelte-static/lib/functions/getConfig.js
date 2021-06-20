const path = require('path');

const PROJECT_ROOT = path.join(process.cwd());
const DEFAULT_STATIC_CONFIG = 'static.config.js';
const DEFAULT_TEMPLATES_DIR = 'templates';
const DEFAULT_LAYOUTS_DIR = 'layouts';

function getConfig(state) {
    const config = {
        is: {
            dev: !!state.dev
        },
        devServer: {
            host: 'localhost',
            port: 3000,
        },
        paths: {
            projectRoot: PROJECT_ROOT,
            staticConfig: path.join(PROJECT_ROOT, DEFAULT_STATIC_CONFIG),
            templates: path.join(PROJECT_ROOT, 'src', DEFAULT_TEMPLATES_DIR),
            layouts: path.join(PROJECT_ROOT, 'src', DEFAULT_LAYOUTS_DIR),
            svelte: path.join(PROJECT_ROOT, 'node_modules', 'svelte'),
            output: path.join(PROJECT_ROOT, 'dist'),
            coreApp: path.join(__dirname, './../app/'),
        }
    }
    state.config = config;
    return state
}

module.exports = getConfig