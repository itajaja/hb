const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.NODE_ENV;
const PRODUCTION = TARGET === 'production';
const DEVELOPMENT = TARGET === 'development' || !TARGET;

const config = {
  entry: './src/index.tsx',

  output: {
    path: '/build',
    publicPath: '/static/',
    filename: 'bundle.js',
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/assets/index.html',
      inject: true,
    }),
  ],

  devtool: '#cheap-module-inline-source-map',

  devServer: {
    contentBase: './build',
    historyApiFallback: {
      index: '/static/',
    },
    port: 4999,
    noInfo: true,
  },
};

if (PRODUCTION) {
  config = merge(config, {
    devtool: '#source-map',
  });
}

module.exports = config;
