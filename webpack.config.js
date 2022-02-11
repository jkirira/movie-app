const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {

    entry: './main.js',

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Process CSS with PostCSS.
                    "postcss-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/img/',
                        publicPath: './assets/img/',
                        esModule: false,
                        useRelativePaths: false
                    }
                }]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            //other rules
        ]
    },
    devServer: {
        hot: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./client/src/index.html",
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        //other plugins
    ],
    resolve: {
        extensions: [ '.ts', '.js' ],
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            "stream": require.resolve('stream-browserify'),
            "buffer": require.resolve("buffer")
        },
    },

}