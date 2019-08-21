'use strict'
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf.js')

process.env.NODE_ENV = 'production'
webpack(webpackConfig, (err, stats) => {

})

