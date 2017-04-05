const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  target: 'node',
  entry: {
    index: './src/index.js',
    component: './src/component.js'
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  plugins: [],
  externals: [ nodeExternals() ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
