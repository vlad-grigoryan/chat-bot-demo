const webpack = require('webpack');
const path = require('path');
const rucksack = require('rucksack-css');

module.exports = {
    entry: [
      './public/src/index.js'
    ],

    output: {
        path: __dirname + '/public/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: "eval",
    module: {
    rules: [
        {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                  presets: ["stage-0", 'es2015', 'react' ],
                  plugins: ["transform-class-properties"],
                  cacheDirectory: true
              }
        },

        {
            test: /\.css$/,
            use: [
                'style-loader?sourceMap',
                'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
            ]
        },
        {
            test: /\.json$/,
            use: 'json-loader'
        }

    ]
    },



    resolve: {
    extensions: ['.js','.scss']
    },

    devServer: {
        historyApiFallback: true,
        contentBase: './public'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            minChunks: Infinity,
            filename: 'vendor.bundle.js'

        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
      }
    })
    ]
};
