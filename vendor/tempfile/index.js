'use strict';

var path = require('path');
var uuid = require('uuid');
var tempDir = require('../temp-dir');

module.exports = function (ext) {
  return path.join(tempDir, uuid.v4() + (ext || ''));
};

