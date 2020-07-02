const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const mode = "development"

module.exports = {
    devServer: {
        port: 9000,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/',
        hot: true,
    },
    watch: true,
    mode: mode,
    devtool: "eval-cheap-module-source-map",//show the right line when debuging
    entry: {
        application: "./src/javascripts/index.js", // the name of the output will be the properties name: 'application'
        admin: './src/javascripts/admin.js', // the name of the output will be the properties name: 'admin'
    },
    output: {
        //filename: "../build/main.js"
        filename: mode == 'production' ? "[name]-[contenthash].js" : '[name].js', //the webpack-dev-server does not accept contenthash or chunkhash
        path: path.resolve(__dirname, 'dist') //another way of catching the relative path
    },
    resolve: {
        alias: {
            CssFolder: path.resolve(__dirname, 'src/stylesheets/')
        },
        modules: [path.resolve(__dirname,'src/downloaded_libs'), 'node_modules'] //tells webpack to go search modules first in that folder, and after in the node_modules, which is the default
    },
    optimization: { //Setting a optimization.minimizer overrides the defaults provided by webpack, so I need to put the JS minimizer too
        minimizer: [
            new TerserJSPlugin({}), //webpack default JS minimizer, but I need to put because I'm overriding
            new OptimizeCssAssetsPlugin({})//CSS minimizer
        ]
    },
    // configuring babel-loader
    module: { // there's a module object
        rules: [ // then there's a array of rules for loaders
            {
                test: /\.m?js$/, //tell webpack that whenever there is a file with an ".mjs or .js" the babel loader should be applied to it.
                exclude: /(node_modules|bower_components)/,//tells webpack to skip files if they are node modules or bower components.
                use: {//tells webpack the name of the loader to use, and sets some additional options.
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            /*this code is before I installed postcss-loader, the recommended way is right below this commented code
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
            */
            {
                test: /\.css$/i,
                use: [
                    /*'style-loader', thus is to inject the css in <style> tags in the DOM*/
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true, // I just need to add this for the HMR to work with the CSS files
                        },
                    }, //this is for injecting the css in a new file
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    /*'postcss-loader' in place of this string we put an object the following code: */
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 3 versions', 'ie >9']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    /*'style-loader', thus is to inject the css in <style> tags in the DOM*/
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true, // I just need to add this for the HMR to work with the CSS files
                        },
                    }, //this is for injecting the css in a new file
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    /*'postcss-loader' in place of this string we put an object the following code: */
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 3 versions', 'ie >9']
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            fallback: 'file-loader', //that's the default option, so it can be removed from here. It specifies an alternative loader to use when a target file's size exceeds the limit.
                            name: mode == 'production' ? '[name]_[hash:7].[ext]' : '[name].[ext]',
                        },
                    },
                    { loader: 'image-webpack-loader' },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'
        }),
        new WebpackManifestPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: mode == 'production' ? '[name]-[contenthash].css' : '[name].css' //this is where all the style will be put in the output folder
        })
    ]
}