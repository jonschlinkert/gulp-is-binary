'use strict';

var through = require('through2');
var isBinary = require('isbinaryfile');

module.exports = function(options) {
  return through.obj(function(file, enc, next) {

    file.isBinary = function() {
      if (file.hasOwnProperty('_isBinary')) {
        return file._isBinary;
      }

      if (file.isNull() || file.isStream() || file.isDirectory()) {
        file._isBinary = false;
        return false;
      }

      var len = file.stat ? file.stat.size : file.contents.length;
      file._isBinary = isBinary.sync(file.contents, len);
      return file._isBinary;
    };

    next(null, file);
  });
};
