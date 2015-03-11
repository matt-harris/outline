// Include gulp
var gulp = require('gulp');

// Include plugins
// Sass / CSS
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// notify when task is complete
var notify = require('gulp-notify');



// Tasks
// Compile sass
gulp.task('css', function() {
  gulp.src('scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    errLogToConsole: true
  }))

  // auto prefix css
  .pipe(prefix('last 2 versions'))

  // minify the css file
  .pipe(minifycss())

  // move css file to folder
  .pipe(gulp.dest('css/'))

  .pipe(sourcemaps.write())

  // notify to say the task has complete
  .pipe(notify({
    message: 'CSS task complete'
  }))
});

// Concatenate js files and minify
gulp.task('js', function() {

  // notify to say the task has complete
  .pipe(notify({
    message: 'JS task complete'
  }))
});

// Compress images
gulp.task('images', function() {

  // notify to say the task has complete
  .pipe(notify({
    message: 'Images task complete'
  }))
});

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['css']);
});

// Default Task
gulp.task('default', ['css', 'watch']);