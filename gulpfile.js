'use strict';

var gulp = require('gulp');
var isBinary = require('./');
var through = require('through2');

gulp.task('default', function() {
  return gulp.src('fixtures/**/*')
    .pipe(isBinary())
    .pipe(through.obj(function(file, enc, next) {
      if (file.isNull()) {
        next(null, file);
        return;
      }
      console.log(file.isBinary());
      next(null, file);
    }))
});
