'use strict'

const fs = require('fs')
const tempfile = require('./vendor/tempfile')
const userAsyncFunction = require('user-async-function')

type UserFn = (...args: any[]) => any

module.exports = function withTempFile (fn: UserFn, filename: string = tempfile()) {
  let unlinked = false
  const unlink = () => {
    if (unlinked) return
    unlinked = true
    try { fs.unlinkSync(filename) } catch (_) { return }
  }
  function handleReturn (ret: any = null) {
    setTimeout(unlink, 1000)
    process.on('exit', unlink)

    return ret
  }
  function handleError (error: Error) {
    handleReturn()
    throw error
  }
  const ws = fs.createWriteStream(filename)
  ws.unlink = unlink
  return userAsyncFunction(fn, ws, filename)
    .then(handleReturn, handleError)
}
