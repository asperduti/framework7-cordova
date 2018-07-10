const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/www/',
    filename: './js/bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
     }),
   new CopyWebpackPlugin([
         {from: './src/index.html', to: './index.html'},
         {from: './src/page', to: './page' },
         {from: './src/locales', to: './locales' }
     ])
  ],
  module: {
    rules: [
    {
      test: /\.html$/,
      use: [ {
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }],
    },
    {
      test: /\.css$/,
      use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
    },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          outputPath: 'img/',
          publicPath: '../img/'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          outputPath: 'media/',
          publicPath: '../media/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          outputPath: 'font/',
          publicPath: '../font/'
        }
     },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  }
};


if (process.env.NODE_ENV === 'production') {
   console.log("Gato")
    config.plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
}

module.exports = config
