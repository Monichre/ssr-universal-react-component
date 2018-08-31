const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
  // REQUIRED: webpackHotServerMiddleware is expecting two webpack configs,
  // one with a name 'client', one with a name 'server'.
  name: 'server',
  // Target browsers for our client config
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // REQUIRED: server specific version of css-loader
        use: 'css-loader/locals'
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2' // RELATED: 'commonjs2' makes the below file's export available via module.exports
    // Our webpack hot server will expect this
  },
  entry: path.resolve(__dirname, '../server/render.js'), // RELATED: Need to make sure the export from this file is available to 'module.exports'
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
      // This enables the server side code to run synchronously because there is only one chunk
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development') // This will turn on various development features on in webpack
      }
    })
  ]
}
