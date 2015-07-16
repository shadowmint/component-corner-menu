var babel = require('gulp-babel');
var gulp = require('gulp');

gulp.task('default', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});
