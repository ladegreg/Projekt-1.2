const {resolve} = require('path');
const {glob} = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');


module.exports = {
  entry: './src/app.jsx',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options:{
              presets: ['env', 'stage-2', 'react']
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: 'file-loader?name=../images/[name].[ext]'
      },
    ]
  },
  plugins: [
    require('autoprefixer'),
    new ExtractTextPlugin('css/style.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(resolve(__dirname, 'src/*.html')),
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    })
  ]
};
