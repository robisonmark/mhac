const path = require('path')

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  filenameHashing: true,
  productionSourceMap: true,
  outputDir: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, './dist') : path.resolve(__dirname, './staging-dist'),
  configureWebpack: {
    devtool: 'source-map',
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: 'js/[name].[hash:8].js'
    }
  }
}
