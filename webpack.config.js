const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const productionUrl = 'http://domain.com/'; // Change
const distDirName = 'dist';
const publicDirName = 'public';
const sourceDirName = 'app';

const NODE_ENV = process.env.NODE_ENV;
const isInProduction = NODE_ENV === 'production';

const autoprefixer = require('autoprefixer');
const path = require('path');
const distPath = path.join(__dirname, distDirName);
const publicPath = path.join(__dirname, publicDirName);
const sourcePath = path.join(__dirname, sourceDirName);
const webpack = require('webpack');
const webpageValidator = require('webpack-validator');

function sourceFile(fileName) {
  return `${sourcePath}/${fileName}`;
}

const options = {
  entry: {
    app: sourceFile('index.js'),
  },
  output: {
    filename: 'app.js',
    path: distPath,
    publicPath: isInProduction ? productionUrl : 'http://0.0.0.0:8080/',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [
        'babel-loader?presets[]=es2015',
        'eslint-loader',
      ],
    }, {
      test: /\.html$/,
      loader: 'html-loader?interpolate&minimize=true',
    }, {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader?importLoaders=1&sourceMap',
        'postcss-loader',
        'resolve-url-loader',
        'sass-loader?sourceMap',
      ]
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file-loader?name=./images/[name].[ext]',
        'image-webpack-loader'
      ]
    }, {
      test: /\.txt$/,
      loaders: [
        'file-loader?name=[name].[ext]',
      ],
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Jebbit deployment module',
      template: `${publicPath}/index.html`,
    }),
    new FaviconsWebpackPlugin({
      logo: `${publicPath}/images/favicon.png`,
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
        eslint: {
          configFile: './.eslintrc.js',
        },
        postcss: [
          autoprefixer
        ],
        sassLoader: {
          data: '$isInProduction: ' + isInProduction + ';',
          includePaths: [
            path.resolve(__dirname, './node_modules/compass-boilerplate/lib'),
          ],
        },
        output: {
          path: distPath,
        }
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
