const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const { styleLoaders } = require('./styleLoader')

module.exports = merge(baseConfig, {
  module: styleLoaders({
    sourceMap: true,
    extract: true,
    usePostcss: true
  }),
  devtool: '#source-map'
})
