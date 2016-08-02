'use strict';

var gulp = require('gulp');
var isBinary = require('./');

gulp.task('default', function() {
  return gulp.src('*.js')
    .pipe(isBinary())
    .pipe(gulp.dest('temp'));
});
