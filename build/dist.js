const path    = require('path');
const webpack = require('webpack');
const pkg     = require('../package.json');
const base    = require('./webpack.config');

base.entry ='./src/index.js';
base.output = {
  path         : path.resolve(__dirname, '../dist'),
  publicPath   : '/dist/',
  filename     : `${pkg.name}.min.js`,
  library      : 'vueProductCarousel',
  libraryTarget: 'umd'
};

var webpackConfig = Object.assign({}, base);

webpackConfig.devtool = '#source-map';
webpackConfig.plugins = (webpackConfig.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false}
  }),
  new webpack.optimize.OccurenceOrderPlugin()
]);

module.exports = webpackConfig;
