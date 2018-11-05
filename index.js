'use strict';
var fs = require('fs');
var tempfile = require('./vendor/tempfile');
var userAsyncFunction = require('user-async-function');
module.exports = function withTempFile(fn, filename) {
    if (filename === void 0) { filename = tempfile(); }
    var unlinked = false;
    var unlink = function () {
        if (unlinked)
            return;
        unlinked = true;
        try {
            fs.unlinkSync(filename);
        }
        catch (_) {
            return;
        }
    };
    function handleReturn(ret) {
        if (ret === void 0) { ret = null; }
        setTimeout(unlink, 1000);
        process.on('exit', unlink);
        return ret;
    }
    function handleError(error) {
        handleReturn();
        throw error;
    }
    var ws = fs.createWriteStream(filename);
    ws.unlink = unlink;
    return userAsyncFunction(fn, ws, filename)
        .then(handleReturn, handleError);
};
