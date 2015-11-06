var run = require('run-sequence');
var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
var combine = require('gulp-js-combine');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var insert = require('gulp-insert');

gulp.task('scripts', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function() {
  return gulp.src('./src/**/*.jade')
    .pipe(jade({ client: true }))
    .pipe(insert.prepend('module.exports = '))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('./build'));
});

gulp.task('combine', function() {
  return gulp.src(['./build/**/*.css'])
    .pipe(combine({
      root: './build',
      output: 'assets.js',
    }))
    .pipe(insert.prepend('module.exports = '))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function(callback) {
  run('templates', 'styles', 'scripts', 'combine', callback);
});
