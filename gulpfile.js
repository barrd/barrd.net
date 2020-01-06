"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

// Compile SCSS -> CSS
function style() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
}

// Parse and render CSS for dist
function css() {
  var plugins = [autoprefixer("last 2 version"), cssnano()];
  return gulp
    .src("./css/*.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./css"));
}

// Watch for changes & refresh browser(s)
function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./scss/**/*.scss", style);
  gulp.watch("./*html").on("change", browserSync.reload);
  gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.css = css;
exports.watch = watch;
