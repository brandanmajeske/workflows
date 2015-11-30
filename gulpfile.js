var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('log', function(){
  gutil.log('logging thing...');
});

gulp.task('default', ['log'], function(){
  gutil.log('Doing the default needful - in the callback');
});
