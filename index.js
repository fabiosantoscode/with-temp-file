'use strict'

var fs = require('fs')
var tempfile = require('./vendor/tempfile')
var userAsyncFunction = require('user-async-function')

module.exports = function withTempFile (fn, filename) {
  if (!filename) filename = tempfile()
  return userAsyncFunction(fn, fs.createWriteStream(filename), filename).then(function (ret) {
    fs.unlink(filename, function () {})
    return ret
  })
}
