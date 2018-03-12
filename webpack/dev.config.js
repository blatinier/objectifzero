const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'source-map', // 'cheap-module-eval-source-map'
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }],
    },
    plugins: [
        new MiniCssExtractPlugin('styles/[name].css')
    ]
};
