var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');


var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if(env === 'development') {
  outputDir = 'builds/development';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production';
  sassStyle = 'compressed';
}

coffeeSources = ['components/coffee/*.coffee'];
jsSources = ['components/scripts/*.js'];
sassSources = ['components/sass/style.scss'];
htmlSources = ['builds/development/*.html'];
jsonSources = ['builds/development/js/*.json'];

gulp.task('connect', function(){
  connect.server({
    root:  outputDir,
    livereload: true
  });
});

gulp.task('compass', function(){
  gulp.src(sassSources)
      .pipe(compass({
        sass: 'components/sass',
        image:  outputDir + 'images',
        style: sassStyle
      })
      .on('error', gutil.log))
      .pipe(gulp.dest( outputDir + '/css'))
      .pipe(connect.reload());
});

gulp.task('coffee', function(){
  gulp.src(coffeeSources)
      .pipe(coffee({bare: true})
      .on('error', gutil.log))
      .pipe(gulp.dest('components/scripts'))
      .pipe(connect.reload());
});

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest( outputDir + '/js'))
    .pipe(connect.reload());
});

gulp.task('html', function(){
  gulp.src(htmlSources)
      .pipe(connect.reload());
});

gulp.task('json', function(){
  gulp.src(jsonSources)
      .pipe(connect.reload());
});

gulp.task('log', function(){
  gutil.log('logging thing...');
});

gulp.task('watch', function(){
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsonSources, ['json']);
  gulp.watch('components/sass/**/*.scss', ['compass']);
});


gulp.task('default', ['log', 'coffee', 'js', 'compass', 'connect', 'watch'], function(){
  gutil.log('Doing the default needful - in the callback');
});
