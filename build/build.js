'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const express = require('express')
const constants = require('../constants')

const spinner = ora('building for production...')
spinner.start()

rm(constants.DIST, err => {
  if (err) throw err
})

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })

  /**************************server启动*********************************/
  const server = require('../server/app')
  var app = express()
  // serve pure static assets
  var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
  // app.use(staticPath, express.static('./static'));
  app.use(staticPath, express.static(path.join(constants.DIST, staticPath)));
  server(app);

  // default port where dev server listens for incoming traffic
  var port = process.env.PORT || config.build.port
  module.exports = app.listen(port, '0.0.0.0', function (err) {
    if (err) {
      console.log(err)
      return
    }
    var uri = 'http://localhost:' + port
    console.warn('Server will be listening at ' + uri + '\n')
  })
})
