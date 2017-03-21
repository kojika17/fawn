'use strict';

var gulp         = require('gulp');
var autoprefixer = require('autoprefixer');
var cssMqpacker  = require('css-mqpacker');
var postcss      = require('gulp-postcss');
var assets       = require('postcss-assets');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync').create();

/**
 * Task
 */

// BrowserSync
gulp.task('bs', function() {
  browserSync.init({
    server: {
        baseDir: './'
    }
  });
});


/**
 * Build
 */
 // CSS
gulp.task('build:css', function() {
  return gulp.src('./test/*.scss')
    .pipe(sass())
    .pipe(postcss([
      cssMqpacker({ sort: true }),
      // autoprefixer(),
      // assets({
      //   loadPaths: ['static/']
      // })
    ]))
    .pipe(gulp.dest('./test'));
});

/**
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch('./core/**/*.scss', ['build:css']);
  gulp.watch('./test/*.scss', ['build:css']);
  gulp.watch('./test/*.css').on('change', browserSync.reload);
});


/**
 * Command
 */

// 開発
gulp.task('default', ['build:css', 'bs', 'watch']);
