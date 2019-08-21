'use strict'
const path = require('path')
const globby = require('globby')
const vueLoaderConfig = require('./vueLoader')

const SRC_PATH = path.resolve(__dirname,'../src')
const getEntries = () => {
  // 不要使用 await globby()
  const entries = globby.sync(SRC_PATH +  '/entries/*.js')
  const map = {}
  entries.forEach((entry)=>{
    const filename = path.basename(entry, '.js')
    map[filename] = entry
  })

  return map
}

const resolve = (dir)=>{
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () =>({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  include: [resolve('src'), resolve('dist')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: false
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: getEntries(), // 坑一：getEntries 不能是异步函数...
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve:{
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  module: {
    rules: [
      createLintingRule(),
      {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    },{

      test: /\.js$/,
      loader: 'babel-loader',
    }]
  },
}
