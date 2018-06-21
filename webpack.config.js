const path = require('path')
module.exports = {
    entry: './public/stylesheets/main.sass',
    output: {
        filename: 'bundle.js',
        path:  __dirname + '/public/js/bundles'
    },
    module: {
        rules: [{
            test: /\.sass$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS
            ]
        }]
    }
}