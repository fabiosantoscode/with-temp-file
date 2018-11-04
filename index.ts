'use strict'

const fs = require('fs')
const tempfile = require('./vendor/tempfile')
const userAsyncFunction = require('user-async-function')

type UserFn = (...args: any[]) => any

module.exports = function withTempFile (fn: UserFn, filename: string = tempfile()) {
  function handleReturn (ret: any = null) {
    let unlinked = false

    const unlink = () => {
      if (unlinked) return
      unlinked = true
      try { fs.unlinkSync(filename) } catch (_) { return }
    }

    setTimeout(unlink, 1000)
    process.on('exit', unlink)

    return ret
  }
  function handleError (error: Error) {
    handleReturn()
    throw error
  }
  return userAsyncFunction(fn, fs.createWriteStream(filename), filename)
    .then(handleReturn, handleError)
}
