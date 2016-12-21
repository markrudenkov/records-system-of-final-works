var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
     entry: {
         homepage: './src/main/frontend/entries/homepage.js',
     },
     output: {
         path: './target/classes/static/',
         filename: '[name].bundle.js'
     },
     module: {
         loaders: [
             //{ test: /\.scss$/, loader:  ExtractTextPlugin.extract("style","css!sass") },
             { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
             { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
             { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
             { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
             { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
             { test: /\.html$/, loaders: ['ngtemplate', 'html'] },
             {
                 test: /\.jsx?$/,
                 exclude: /node_modules/,
                 loader: 'babel'
             },
             {
                 test: /\.scss$/,
                 loader: ExtractTextPlugin.extract("style", "css?localIdentName=[name]__[local]___[hash:base64:5]!sass")
             }
         ]
     },
     plugins: [
         new ExtractTextPlugin("styles.bundle.css", {
            allChunks: true
         })
     ],
     resolve: {
        root: __dirname+'src/main/frontend',
        extensions: ['', '.js', '.jsx', '.css', 'scss'],
        modulesDirectories: [
            'node_modules', '.'
        ],
        alias: {
        }
    }
 };
