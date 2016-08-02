'use strict';

var through = require('through2');
var isBinary = require('isbinaryfile');

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    isBinary(file.contents, file.stat.size, function(err, binary) {
      if (err) {

      }
      console.log(arguments)

      next(null, file);
    });
  });
};
