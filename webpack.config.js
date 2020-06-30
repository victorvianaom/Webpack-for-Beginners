const path = require('path')

module.exports = {
    entry: "./src/index.js",
    output: {
        //filename: "../build/main.js"
        filename: "main.js" //the default folder is dist
        path: path.resolve(__dirname, 'bosta') //another way of catching the relative path
    }
}