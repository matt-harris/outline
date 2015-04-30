// Include gulp
var gulp = require('gulp');

// Include plugins
// npm install --save-dev gulp-sass gulp-autoprefixer gulp-minify-css gulp-concat gulp-uglify gulp-imagemin browser-sync gulp-cache gulp-notify gulp-size gulp-rename
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var images = require('gulp-imagemin');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var cache = require('gulp-cache');
var notify = require('gulp-notify');
var size = require('gulp-size');
var rename = require('gulp-rename');

// Default Task
gulp.task('default', ['css', 'js', 'images', 'browser-sync', 'watch']);

// Tasks
// Compile sass
gulp.task('css', function() {
  gulp.src('scss/**/*.scss')
  .pipe(sass({
    errLogToConsole: true
  }))

  // auto prefix css
  .pipe(prefix('last 2 versions'))

  // move css file to folder
  .pipe(gulp.dest('css/'))

  // rename the file with .min
  .pipe(rename({
    suffix: '.min'
  }))

  // minify the file
  .pipe(minifycss())

  // move minified css file to folder
  .pipe(gulp.dest('css/'))

  // get file size (gzipped)
  .pipe(size({
    gzip: true
  }))

  // notify to say the task has complete
  .pipe(notify({
    message: 'CSS task complete'
  }))
});

// Concatenate js files and minify
gulp.task('js', function() {
  gulp.src('js/*.js')

  .pipe(concat('bundle.js'))

  // minify the file
  .pipe(uglify())

  // move js file to folder
  .pipe(gulp.dest('js/min/'))

  // notify to say the task has complete
  .pipe(notify({
    message: 'JS task complete'
  }))
});

// Compress images
gulp.task('images', function() {
  gulp.src('img/*.{gif,jpg,png}')
  .pipe(cache(images({
    optimizationLevel: 4,
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('img/min/'))

  // notify to say the task has complete
  .pipe(notify({
    message: 'Images task complete'
  }))
});

// Reload browser
gulp.task('reload', function () {
  browserSync.reload();
});

// Prepare Browser-sync
gulp.task('browser-sync', function() {
  browserSync.init(['scss/**/*.scss', 'js/*.js'], {
  //proxy: 'your_dev_site.url'
    server: {
        baseDir: './'
    }
  });
});

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['css']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('img/*' , ['images']);
  gulp.watch(['*.html'], ['reload']);
});