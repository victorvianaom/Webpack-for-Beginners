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
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}