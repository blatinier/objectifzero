const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TARGET = process.env.npm_lifecycle_event;

let SERVER_URL;

if (TARGET === 'dev') {
    try {
        const config = require('./custom_config.js');
        SERVER_URL = config.serverUrl;
    } catch (e) {
        SERVER_URL = 'http://127.0.0.1:8042';
    }
} else {
    SERVER_URL = 'https://www.enjoyzerodechet.fr';
}

const PATHS = {
    app: path.join(__dirname, '../src/static'),
    build: path.join(__dirname, '../src/static_dist'),
};

const VENDOR = [
    'babel-polyfill',
    'history',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-mixin',
    'classnames',
    'redux',
    'react-router-redux',
    'jquery',
];

const basePath = path.resolve(__dirname, '../src/static/');

const common = {
    context: basePath,
    entry: {
        vendor: VENDOR,
        app: PATHS.app,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: path.resolve(__dirname, 'node_modules'),
                    name: 'vendor',
                    enforce: true,
                },
                commons: {
                    minChunks: 3,
                    enforce: true,
                },
            },
        },
    },
    output: {
        filename: '[name].js',
        path: PATHS.build,
        publicPath: '/static',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/static/index.html'),
            hash: true,
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            filename: 'index.html',
            inject: 'body',
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CleanWebpackPlugin([PATHS.build], {
            root: process.cwd(),
        }),
        new MiniCssExtractPlugin('styles/[name].css'),
        new webpack.DefinePlugin({
            'process.env.SERVER_URL': JSON.stringify(SERVER_URL),
        }),
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loader: 'file-loader?name=/images/[name].[ext]?[hash]',
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },
};

if (TARGET === 'dev') {
    common.devtool = 'source-map'; // 'cheap-module-eval-source-map'
}

module.exports = common;
