'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

/**
 * environment specific config - default to local
 */
var currentEnvironment = process.env.NODE_ENV || 'local';
var config = require('./config/' + currentEnvironment);

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: './app.js',
    html: './index.html'
  },

  module: {
    preLoaders: config.WEBPACK.preLoaders,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$|\.wav$|\.mp3$/,
        loader: 'file?name=assets/images/[name].[ext]'
      },
      {
        test: /\.woff$|\.ttf$|\.eot$/,
        loader: 'file?name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('app.css'),
    new OpenBrowserPlugin({url: 'http://localhost:8080'})
  ],

  devServer: {
    historyApiFallback: true
  },

  // Need to set this so webpack won't attempt to load node_modules in *.common
  // In relation to the folder we are referencing
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },

  output: {
    filename: 'app.js',
    path: __dirname + '/build'
  },

  devtool: config.WEBPACK.devtool
};
