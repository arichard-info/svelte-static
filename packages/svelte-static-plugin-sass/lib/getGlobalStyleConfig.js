const miniCssExtractPlugin = require("mini-css-extract-plugin");

const getGlobalStyleConfig = (state, { entry }) => ({
    mode: state.mode === "dev" ? "development" : "production",
    entry: { style: entry },
    output: {
        path: state.config.paths.output,
        filename: "style.js",
        chunkFilename: "style.[id].js",
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [new miniCssExtractPlugin({ filename: "[name].css" })],
    devtool: state.mode === "dev" && "source-map",
})

module.exports = getGlobalStyleConfig;