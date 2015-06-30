var prefix = require('gulp-autoprefixer');
var combine = require('gulp-js-combine');
var run = require('run-sequence');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var umd = require('gulp-umd');
var gulp = require('gulp');

gulp.task('scripts', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./build'));
});

gulp.task('templates', function() {
  return gulp.src('./src/**/*.jade')
    .pipe(jade({ client: true }))
    .pipe(gulp.dest('./build'));
});

gulp.task('styles', function() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('./build'));
});

gulp.task('combine', function() {
  return gulp.src('./build/**/*')
    .pipe(combine({
      root: './build',
      output: 'component.js',
      bootstrap: 'bootstrap.js',
      export: 'Component'
    }))
    .pipe(umd())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function(callback) {
  run('templates', 'styles', 'scripts', 'combine', callback);
});

/// Run a local demo site to test with
var browserify = require('gulp-browserify');
var gls = require('gulp-live-server');

gulp.task('build-demo', function(callback) {
  run('default', 'build-demo-script', callback);
})

gulp.task('build-demo-script', function() {
  return gulp.src('./demo/src/index.js')
    .pipe(babel())
    .pipe(browserify())
    .pipe(gulp.dest('./demo'));
});

gulp.task('demo', ['build-demo'], function() {
  var server = gls.new('demo/server.js');
  server.start();
  gulp.watch(['src/**/*'], ['build-demo']);
  gulp.watch(['demo/**/*'], ['build-demo']);
});
