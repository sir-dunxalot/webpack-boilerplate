var CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const isInProduction = NODE_ENV === 'production';

var autoprefixer = require('autoprefixer');
var path = require('path');
var distPath = path.join(__dirname, 'dist');
var webpack = require('webpack');
var webpageValidator = require('webpack-validator');

var options = {
  entry: {
    app: path.join(__dirname, 'app/index.js'),
  },
  output: {
    filename: 'app.js',
    path: distPath,
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      },
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      query: {
        minimize: true
      }
    }, {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader',
        'sass-loader',
      ]
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Jebbit deployment module',
      template: 'app/index.html',
    }),
    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CleanWebpackPlugin([distPath], {
      root: process.cwd(),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer
        ],
        sassLoader: {
          data: '$isInProduction: ' + isInProduction + ';',
          includePaths: [
            path.resolve(__dirname, './node_modules/compass-boilerplate/lib'),
          ],
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
        'isInProduction': JSON.stringify(isInProduction),
      },
    }),
    new CompressionPlugin(), // gzip assets
  ],

  /* http://survivejs.com/webpack/developing-with-webpack/automatic-browser-refresh/ */

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
  },
};

if (isInProduction) {
  options.devtool = 'source-map';
} else {
  options.devtool = 'eval-source-map';
}

module.exports = webpageValidator(options);
