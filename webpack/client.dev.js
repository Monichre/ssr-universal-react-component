const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
  // REQUIRED: webpackHotServerMiddleware is expecting two webpack configs,
  // one with a name 'client', one with a name 'server'.
  name: 'client',
  // Target browsers for our client config
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    // REQUIRED: file and chunk names should match
    filename: '[name].js',
    chunkFilename: '[name].js',
    // REQUIRED: where to write files to
    path: path.resolve(__dirname, '../buildClient'),
    // REQUIRED: where files will be served from
    publicPath: '/static/'
  },
  optimization: {
    runtimeChunk: {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        }
      }
    }
  },

  plugins: [
    // REQUIRED: We have to initialize our ExtractCssChunks plugin
    new ExtractCssChunks({
      hot: true,
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development') // This will turn on various development features on in webpack
      }
    })
  ]
}
