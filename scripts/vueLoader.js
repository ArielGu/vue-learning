'use strict'
const { cssLoaders } = require('./styleLoader')

module.exports = {
  loaders: cssLoaders({
    sourceMap: true,
    extract: true // 坑二：loader 和 plugin 配合使用
  }),
  cssSourceMap: true,
  cacheBusting: true,
}
