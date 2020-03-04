// Include gulp
var gulp = require('gulp');

// Include plugins
// npm install gulp gulp-sass node-sass gulp-autoprefixer gulp-concat gulp-size gulp-rename gulp-uglify gulp-imagemin browser-sync gulp-cache gulp-notify gulp-size gulp-clean-css --save-dev

var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');

const size = require('gulp-size');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

var uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');

// var browserSync = require('browser-sync');
// var reload = browserSync.reload;

var cache = require('gulp-cache');

// Default Task
gulp.task('default', ['sass', 'js', 'imagemin', 'watch']);
// 'browser-sync',

// Tasks
// Compile sass
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))

    // auto prefix, sourcemaps, clean css
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write('.'))
    // move css file to folder
    .pipe(gulp.dest('./../css'))
    // rename the file with .min
    .pipe(rename({
      suffix: '.min'
    }))
    // move minified css file to folder
    .pipe(gulp.dest('./../css'))
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
gulp.task('imagemin', function() {
  gulp.src('img/*.{gif,jpg,png}')
  .pipe(cache(imagemin({
    optimizationLevel: 4,
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('./../img/'))
  // notify to say the task has complete
  .pipe(notify({
    message: 'Imagemin task complete'
  }))
});

// // Reload browser
// gulp.task('reload', function () {
//   browserSync.reload();
// });
//
// // Prepare Browser-sync
// gulp.task('browser-sync', function() {
//   browserSync.init(['scss/**/*.scss', 'js/*.js'], {
//   //proxy: 'your_dev_site.url'
//     server: {
//         baseDir: './'
//     }
//   });
// });

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('img/*' , ['imagemin']);
});
  // gulp.watch(['*.html'], ['reload']);
