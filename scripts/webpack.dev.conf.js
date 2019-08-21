const path = require('path')
const globby = require('globby')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base.conf')
const { styleLoaders } = require('./styleLoader')

const TEMPLATE_PATH = path.resolve(__dirname, '../template')
const htmlPlugin = () => {
  const entryHtml = globby.sync(TEMPLATE_PATH + '/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
    let filename = path.basename(filePath, '.html')

    let config = {
      template: filePath,
      filename: filename + '.html',
      chunks: [filename],
      inject: true,
    }
    arr.push(new HtmlWebpackPlugin(config))
  })
  return arr
}

module.exports = merge(baseConfig, {
  module: {
    rules: styleLoaders({ sourceMap: true, usePostCSS: true })
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: 'localhost',
    port: 8080,
    open: true,
    overlay: true,
    publicPath: '/',
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new ExtractTextPlugin({
      filename: '[contenthash].css'
    })
  ].concat(htmlPlugin())
})
