/* eslint-disable max-len */
import webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

export default {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  entry: ['./client/index.js'],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist-client'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.ProvidePlugin({
      $: 'jquery', //eslint-disable-line id-length
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new WebpackMd5Hash(),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      noInfo: true,
      imageWebpackLoader: {
        mozjpeg: {
          quality: 65,
        },
        pngquant: {
          quality: '65-90',
          speed: 4,
        },
        optipng: {
          optimizationLevel: 65,
        },
        gifsicle: {
          interlaced: false,
        },
        svgo: {
          plugins: [
            {
              removeViewBox: false,
            },
            {
              removeEmptyAttrs: false,
            },
          ],
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /\.min\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoader: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.min\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug',
        ],
      },
    ],
  },
};
