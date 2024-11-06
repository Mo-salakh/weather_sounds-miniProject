const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [new ESLintPlugin()],
    devServer: {
        port: '3000',
        hot: true,
        open: true
    }
});