'use strict'

var fs = require('fs')
var tempfile = require('./vendor/tempfile')
var userAsyncFunction = require('user-async-function')

module.exports = function withTempFile (fn, filename) {
  if (!filename) filename = tempfile()
  function handleReturn (ret) {
    var unlinked = false

    setTimeout(unlink, 1000)
    process.on('exit', unlink)

    function unlink () {
      if (unlinked) return
      try { fs.unlinkSync(filename) } catch (_) {}
      unlinked = true
    }

    return ret
  }
  function handleError (error) {
    handleReturn()
    throw error
  }
  return userAsyncFunction(fn, fs.createWriteStream(filename), filename)
    .then(handleReturn, handleError)
}
