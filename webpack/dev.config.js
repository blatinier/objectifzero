const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

let SERVER_URL;

try {
    const config = require('./custom_config.js');
    SERVER_URL = config.serverUrl;
} catch (e) {
    SERVER_URL = 'http://127.0.0.1:8042';
}

module.exports = {
    devtool: 'source-map', // 'cheap-module-eval-source-map'
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        }],
    },
    plugins: [
        new MiniCssExtractPlugin('styles/[name].css'),
        new webpack.DefinePlugin({
            'process.env.SERVER_URL': JSON.stringify(SERVER_URL),
        }),
    ],
};
