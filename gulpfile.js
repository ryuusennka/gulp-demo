const path = require('path');
const { dest, src, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const ejs = require('gulp-ejs');
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
// const del = require('del');
// const config = require('./gulp.config');

function scss() {
  return src('src/assets/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(dest('dist/public/css'));
}

function babeljs() {
  return src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/public/js'));
}

function copyLibs() {
  return src('src/assets/libs/**/*').pipe(dest('dist/public/libs'));
}

function html() {
  return src('./src/**/*.ejs')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(
      ejs({
        msg: 'Hello Gulp!',
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('./dist'));
}

function watcher() {
  watch('src/assets/css/**/*.scss', scss);
  watch('src/assets/js/**/*.js', babeljs);
  watch('src/assets/libs/**/*', copyLibs);
  watch('src/**/*.ejs', html);
}

exports.default = series(parallel(scss, babeljs, html, copyLibs), watcher);
