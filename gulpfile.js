var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = [
  'components/scripts/somefile.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js',
];
var sassSources = ['components/sass/style.scss'];

gulp.task('compass', function(){
  gulp.src(sassSources)
      .pipe(compass({
        sass: 'components/sass',
        image: 'builds/development/images',
        style: 'expanded'
      })
      .on('error', gutil.log))
      .pipe(gulp.dest('builds/development/css'));
});

gulp.task('coffee', function(){
  gulp.src(coffeeSources)
      .pipe(coffee({bare: true})
      .on('error', gutil.log))
      .pipe(gulp.dest('components/scripts'));
});

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(concat('main.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'));
});


gulp.task('log', function(){
  gutil.log('logging thing...');
});

gulp.task('default', ['log', 'coffee', 'js', 'compass'], function(){
  gutil.log('Doing the default needful - in the callback');
});
