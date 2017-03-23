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
        baseDir: './docs/'
    }
  });
});


/**
 * Build
 */
 // CSS
gulp.task('build:css', function() {
  gulp.src('./test/*.scss')
    .pipe(sass())
    .pipe(postcss([
      cssMqpacker({ sort: true }),
      // autoprefixer(),
      // assets({
      //   loadPaths: ['static/']
      // })
    ]))
    .pipe(gulp.dest('./test/'));

  gulp.src('./docs/*.scss')
    .pipe(sass())
    .pipe(postcss([
      cssMqpacker({ sort: true }),
      autoprefixer(),
      // assets({
      //   loadPaths: ['static/']
      // })
    ]))
    .pipe(gulp.dest('./docs/'));
});

/**
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch(['./test/*.scss', './docs/*.scss'], ['build:css']);
  gulp.watch(['./{test, docs}/*.{css, html}']).on('change', browserSync.reload);
});


/**
 * Command
 */

// 開発
gulp.task('default', ['build:css', 'bs', 'watch']);
