const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');
const root = __dirname;

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  devServer: {
    contentBase: [
      path.join(root + '/app'),
      path.join(root + '/dist'),
      path.join(root + '/node_modules')
    ],
    compress: true,
    port: 9000
  }
});
