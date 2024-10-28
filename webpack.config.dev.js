const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');



module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: '3000',
        hot: true,
        open: true
    }
});