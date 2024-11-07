const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.ts',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/[hash][ext]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new MiniCssExtractPlugin(),

        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, 'public/favicon.png'), 
                    to: path.resolve(__dirname, 'dist') 
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
              test: /\.s[ac]ss$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(mp3|wav|ogg|mp4|webm|avi)$/i,
                type: 'asset/resource',
            },
        
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

}