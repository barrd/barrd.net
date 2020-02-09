"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

// Compile SCSS -> CSS
function style() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./src/css"))
    .pipe(browserSync.stream());
}

// Parse and render CSS for dist
function css() {
  var plugins = [autoprefixer("last 2 version"), cssnano()];
  return gulp
    .src("./src/css/*.css")
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
}

// Watch for changes & refresh browser(s)
function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./src/scss/**/*.scss", style);
  gulp.watch("./css/*.css", css);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.watch = watch;
exports.style = style;
exports.css = css;
