const miniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')

const getGlobalStyleConfig = (state, { entry, outputPath, outputFile }) => ({
    mode: state.mode === "dev" ? "development" : "production",
    entry,
    output: {
        path: path.join(state.config.paths.output, outputPath),
        publicPath: outputPath
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [          {
                    loader: miniCssExtractPlugin.loader
                  },
                  {
                    loader: path.resolve(__dirname, "../node_modules/css-loader"),
                    options: {
                      importLoaders: 2
                    }
                  },
                  {
                    loader: path.resolve(__dirname, "../node_modules/sass-loader"),
                  }],
            },
        ],
    },
    plugins: [
        new miniCssExtractPlugin({
          filename: outputFile
        })
      ],
    devtool: state.mode === "dev" && "source-map",
})

module.exports = getGlobalStyleConfig;