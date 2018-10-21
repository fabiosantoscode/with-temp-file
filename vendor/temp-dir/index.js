'use strict';

var fs = require('fs');
var os = require('os');

var ID = '__RESOLVED_TMP_DIR__';

if (!global[ID]) {
	Object.defineProperty(global, ID, {
		value: fs.realpathSync(os.tmpdir())
	});
}

module.exports = global[ID];

