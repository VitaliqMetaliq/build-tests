const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'), 
    assets: 'assets/'
}

module.exports = {

    externals: {
        paths: PATHS
    },

    entry: {
        app: PATHS.src
    }, 
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                resolve: {
                    extensions: [
                        '.js',
                        '.jsx'
                    ]
                },
                exclude: '/node_modules/'
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.(png|jp(e)?g|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.scss$/, 
                use: [
                    "style-loader", 
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true} //КАРТА САЙТА
                    }, {
                        loader: "postcss-loader",
                        options: {sourceMap: true, config: { path: './postcss.config.js'}}
                    }, {
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    }
                ]
            }, {
                test: /\.css$/, 
                use: [ 
                    "style-loader", 
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true} //КАРТА САЙТА
                    }, {
                        loader: "postcss-loader",
                        options: {sourceMap: true, config: { path: './postcss.config.js'}}
                    } 
                ]
            }
        ]
    },
    
     
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery', 
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }), 
        new HtmlWebpackPlugin({
            hash: false, 
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            {from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`},
            {from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`},
            {from: `${PATHS.src}/static`, to: ''}, 

        ])
    ],
}