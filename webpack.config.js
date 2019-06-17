const path = require('path');
const webpack = require('webpack');

const plugins = [];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        include: path.resolve(__dirname, 'src')
      }
    ]
  }
}