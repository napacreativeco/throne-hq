'use strict';

const gulp = require('gulp');
const { series } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const minify = require('gulp-minify');


function buildScripts() {
  return gulp.src('./src/js/*.js')
  .pipe(concat('scripts.js'))
  .pipe(minify())
  .pipe(gulp.dest('dist/'));
}

function buildStyles() {
  return gulp.src('./src/css/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 2 versions"]
    }))
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`original size: ${details.name}: ${details.stats.originalSize}`);
      console.log(`minified: ${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(gulp.dest('dist/'));
};

exports.buildStyles = buildStyles;

function watch() {
    gulp.watch(['./src/css/*.scss', './src/css/home/*.scss'], buildStyles);
    gulp.watch(['./src/js/*.js'], buildScripts);
}
exports.watch = watch;

exports.default = series(buildStyles, buildScripts, watch);