const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, '../src/static'),
    build: path.join(__dirname, '../src/static_dist')
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
        app: PATHS.app
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: path.resolve(__dirname, "node_modules"),
                    name: "vendor",
                    enforce: true
                },
                commons: {
                    minChunks: 3,
                    enforce: true
                }
            }
        }
    },
    output: {
        filename: '[name].js',
        path: PATHS.build,
        publicPath: '/static'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/static/index.html'),
            hash: true,
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: TARGET === 'dev' ? '"development"' : '"production"' },
            '__DEVELOPMENT__': TARGET === 'dev'
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new CleanWebpackPlugin([PATHS.build], {
            root: process.cwd()
        })
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loader: 'file-loader?name=/images/[name].[ext]?[hash]'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
};

switch (TARGET) {
    case 'dev':
        module.exports = merge(require('./dev.config'), common);
        break;
    case 'prod':
        module.exports = merge(require('./prod.config'), common);
        break;
    default:
        console.log('Target configuration not found. Valid targets: "dev" or "prod".');
}
