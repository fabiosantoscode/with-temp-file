'use strict'

var path = require('path')
var fs = require('fs')
var assert = require('assert').strict || require('assert')
var withTempFile = require('..')

describe('with-temp-file', function () {
  it('calls you with a temporary file and returns what you returned', function () {
    return withTempFile(function (file, path) {
      file.write('test')
      file.end()

      return new Promise(function (resolve) {
        file.on('close', resolve)
      }).then(function () {
        return fs.readFileSync(path) + ''
      })
    }).then(function (ret) {
      assert.strictEqual(ret, 'test')
    })
  })
  it('lets you override the filename', function () {
    var filePath = path.join(__dirname, '' + Math.random())
    return withTempFile(function (file, path) {
      assert.strictEqual(filePath, path)
      return Promise.resolve()
    }, filePath)
  })
})
