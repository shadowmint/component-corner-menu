var run = require('run-sequence');
var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var gls = require('gulp-live-server');

gulp.task('build-demo', function(callback) {
  run('default', 'build-demo-script', callback);
})

gulp.task('build-demo-script', function() {
  return gulp.src('./demo/src/index.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(browserify())
    .pipe(gulp.dest('./demo'));
});

gulp.task('demo', ['build-demo'], function() {
  var server = gls.new('demo/server.js');
  server.start();
  gulp.watch(['src/**/*', 'demo/src/**/*'], ['build-demo']);
});
