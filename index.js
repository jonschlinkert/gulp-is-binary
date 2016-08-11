'use strict';

var through = require('through2');
var isBinary = require('file-is-binary');

module.exports = function(options) {
  return through.obj(function(file, enc, next) {

    file.isBinary = function() {
      return isBinary(file);
    };

    next(null, file);
  });
};
