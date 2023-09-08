const path = require('path')

module.exports = {
  lintOnSave: import.meta.env.APP_ENV !== 'production',
  filenameHashing: true,
  productionSourceMap: true,
  outputDir: import.meta.env.APP_ENV === 'production' ? path.resolve(__dirname, './dist') : path.resolve(__dirname, './staging-dist'),
  configureWebpack: {
    devtool: 'source-map',
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: 'js/[name].[hash:8].js'
    }
  }
}
