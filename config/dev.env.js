'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ENDPOINT: '"https://api.robisonhouse.com/"'
  API_ENDPOINT: '"https://api.mhacsports.com/"'

})
