const path = require('path')

module.exports = {
    watch: true,
    mode: "development",
    devtool: "eval-cheap-module-source-map",//show the right line when debuging
    entry: "./src/index.js",
    output: {
        //filename: "../build/main.js"
        filename: "application.js", //the default folder is dist
        path: path.resolve(__dirname, 'build') //another way of catching the relative path
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
                    'style-loader',
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
                    'style-loader',
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
            }
        ]
    }
}