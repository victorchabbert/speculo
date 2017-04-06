const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const shared = {
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].js',
  },
  plugins: [],
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

const server = Object.assign({} ,shared, {
  target: 'node',
  entry: {
    index: './src/index.js',
  },
  output: Object.assign(shared.output, {
    libraryTarget: 'commonjs'
  }),
  externals: [ nodeExternals() ],
})

const client = Object.assign({}, shared, {
  entry: {
    speculoPlugin: './src/frontendPlugin.js'
  },
  externals: [ nodeExternals() ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
})

module.exports = [server, client]
