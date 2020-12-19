const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const srcPath = 'src/';

const core = {
  target: 'web',
  entry: path.resolve(srcPath, 'index.js'),
  devtool: 'source-map',
  optimization: {
    emitOnErrors: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ],
};

const babel = {
  output: {
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        include: [path.resolve(__dirname, srcPath)],
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
      },
    ],
  },
};

const css = {
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CssMinimizerPlugin(),
  ],
};

const dev = {
  mode: 'development',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '/'),
  },
  devServer: {
    proxy: {
      '/api/token': 'http://localhost:7071',
    },
  },
};

const prod = {
  mode: 'production',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build/'),
  },
};

module.exports = (env) => {
  const shared = merge(core, babel, css);
  return env?.development ? merge(shared, dev) : merge(shared, prod);
};
