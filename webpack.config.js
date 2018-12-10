const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: './src/js/index.js',  
  output: {
    path: path.resolve('dist'),
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
      new MiniCssExtractPlugin({
      filename: '[name].css'
      }),

      new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),

      new DashboardPlugin()
  ]
}

