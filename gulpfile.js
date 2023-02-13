"use strict";
const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const projectURL = "https://bauhaus.test";

// Compile SCSS -> CSS, autoprefix, rename .min for dist w/ sourcemap
function style() {
	var plugins = [autoprefixer("last 2 version"), cssnano()];
	return gulp
		.src("src/sass/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss(plugins))
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
}

// JS task: concatenates and uglifies JS files to all.js
function jsTask() {
	return gulp
		.src("src/js/**/*.js")
		.pipe(concat("all.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
}

// Watch for changes & refresh browser(s)
function watch() {
	browserSync.init({
		proxy: projectURL,
	});
	gulp.watch("src/sass/**/*.scss", style);
	gulp.watch("src/js/**/*.js", jsTask);
	gulp.watch("*html").on("change", browserSync.reload);
	gulp.watch("src/sass/**/*.scss").on("change", browserSync.reload);
	gulp.watch("js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.jsTask = jsTask;
exports.watch = watch;
