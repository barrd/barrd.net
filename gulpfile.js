"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

// Compile SCSS -> CSS, autoprefix, rename .min for dist w/ sourcemap
function style() {
  var plugins = [autoprefixer("last 2 version"), cssnano()];
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
}

// Compile SCSS -> CSS for development checking
function css() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css"));
}

// Watch for changes & refresh browser(s)
function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  css();
  gulp.watch("./src/scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.watch = watch;
exports.style = style;
