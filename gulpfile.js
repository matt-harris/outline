// Include gulp
var gulp = require('gulp');

// Include plugins
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var images = require('gulp-imagemin');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
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

  // minify the file
  .pipe(minifycss())

  .pipe(sourcemaps.write())

  // move css file to folder
  .pipe(gulp.dest('css/'))

  // notify to say the task has complete
  .pipe(notify({
    message: 'CSS task complete'
  }))
});

// Concatenate js files and minify
gulp.task('js', function() {
  gulp.src('js/*.js')
  .pipe(sourcemaps.init())

  .pipe(concat('bundle.js'))

  // minify the file
  .pipe(uglify())

  .pipe(sourcemaps.write())

  // move js file to folder
  .pipe(gulp.dest('js/min/'))

  // notify to say the task has complete
  .pipe(notify({
    message: 'JS task complete'
  }))
});

// Compress images
gulp.task('images', function() {
  gulp.src('img/*.{png,jpg,gif}')
  .pipe(changed('img/min'))
  .pipe(images({
    optimizationLevel: 4,
    progressive: true,
    interlaced: true
  }))
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
  gulp.watch(['*.html'], ['reload']);
});

// Default Task
gulp.task('default', ['css', 'js', 'images', 'browser-sync', 'watch']);