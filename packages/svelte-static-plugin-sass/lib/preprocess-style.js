const sass = require("node-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");

/**
 *  Webpack hook : handle the SASS preprocess
 *    - on watch time for development
 *    - on build time for production
 */

module.exports = ({ content, attributes, filename }) => {
    // get path context
    const context = filename.slice(
        0,
        filename.lastIndexOf("/") !== -1
            ? filename.lastIndexOf("/") // remove after last '/'
            : filename.lastIndexOf("\\") // remove after last '\' (windows)
    );

    // TODO
    //   content = `@import "./src/style/variables"; 
    //   ${content}`;

    const output = sass.renderSync({ data: content, includePaths: [context] });
    return autoprefixStyle(output.css, filename);
};

// Autoprefixer for CSS or LESS style
function autoprefixStyle(content, filename) {
    return postcss([autoprefixer])
        .process(content, {
            from: filename,
            to: filename,
        })
        .then((output) => ({
            code: output.css,
            map: output.map,
            dependencies: [filename.replace(".svelte", ".scss")],
        }));
}