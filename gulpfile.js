// Include gulp
var gulp = require('gulp');

// Include plugins
var sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

// Task - compile sass
gulp.task('css', function() {
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())

  // auto prefix css
  .pipe(prefix('last 2 versions'))

  // move expanded css file to folder
  .pipe(gulp.dest('css/')

  // rename css file with .min
  .pipe(rename({
    suffix: '.min'
  }))

  // minify the css file
  .pipe(minifycss())

  // move minified css file to folder
  .pipe(gulp.dest('css/'))

  // notify to say the task has complete
  .pipe(notify({
      message: 'CSS task complete'
  }));
});

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['css']);
});

// Default Task
gulp.task('default', ['css', 'watch']);