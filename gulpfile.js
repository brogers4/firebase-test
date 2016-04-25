var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('default',['server','watch']);
gulp.task('serve',['server']);

gulp.task('server', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: '8088'
  });
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*',['reload']);
});

gulp.task('reload',function() {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});
