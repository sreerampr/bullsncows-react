const webpack = require('webpack');
const path = require('path');
const CommonConfig = require('./webpack.common.js');
const Merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const variables = require('./variables');

module.exports = Merge(CommonConfig, {
  entry: {
    app: [variables.entry],
  },
  output: {
    path: path.resolve(__dirname, variables.dist),
    filename: '[name].bundle.js',
    publicPath: variables.devPublicPath,
    sourceMapFilename: '[name].map'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Bulls & Cows',
      template: 'index.ejs',
      metaImage: 'https://bullsncows-3d0f8.firebaseapp.com/889bff3b5c52e2d4e3010b5b853c7b2f.png',
      metaUrl: variables.gameUrl,
      metaDescription: variables.gameDescription,
      fbAppID: '111074542870113',
      title: "Think you're good with numbers? Try this "+variables.wordType.charAt(0).toUpperCase()+variables.wordType.slice(1)+' Challenge",
      shortcutIcon: '/269e7b7d45bc9a194c8cc0dbf70909a7.png'
    }),
    new ManifestPlugin({
      fileName: '.manifest.json',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true
      },
      parallel: {
        cache: true,
        workers: 2 // for e.g
      },
      comments: false
    })
  ]
});
