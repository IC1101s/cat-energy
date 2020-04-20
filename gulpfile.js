"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var autoprefixer = require("autoprefixer");
var sourcemap = require("gulp-sourcemaps");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var svgstore = require("gulp-svgstore");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var del = require("del");
var server = require("browser-sync").create();

/* gulp html - копирует html файлы в папку build и инклюдит (добавляет) спрайт в html */
gulp.task("html", function () {
	return gulp.src("source/*.html")
	.pipe(posthtml([
		include()
	]))
	.pipe(gulp.dest("build/"));
});

/* gulp css - plumber проверяет на ошибки, sourcemap показывает исходное 
состаяние scss(less) в DevTools (и т.п.), sass преобразует css в sass(scss), postcss включает autoprefixer,
происходит добавление файла style.css в папку build, csso минифицирует style.css,
rename переименовывает в style.min.css, заканчивается слежка за файлами через sourcemap,
файл style.min.css и его map добавляется в папку build, и происходит перезагрузка страницы */
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

/* gulp sprite - берет файлы которые нужно преобразовать в symbol и с помощью
svgstore преобразует их */
gulp.task("sprite", function () {
	return gulp.src("source/img/**/{icon-social-*,icon-contacts-*,htmlacademy*}.svg")
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename("sprite.svg"))
	.pipe(gulp.dest("build/img"));
});

/* gulp images - optipng оптимизирует png, mozjpeg оптимизирует jpeg, 
svgo оптимизирует svg (убирает лишнее) */
gulp.task("images", function () {
	return gulp.src("source/img/**/*.{png,jpg,svg}")
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.mozjpeg({progressive: true}),
	 	imagemin.svgo()
	]))
	.pipe(gulp.dest("source/img"));
});

/* gulp webp - преобразует png и jpeg в webp (90% качества) */
gulp.task("webp", function () {
	return gulp.src("source/img/**/*.{png,jpg}")
	.pipe(webp({quality: 90}))
	.pipe(gulp.dest("source/img"));
});

/* gulp clean - удаляет всё из папки build */
gulp.task("clean", function () {
	return del("build");
});

/* gulp copy - копирует fonts, img, js, ico в папку build */
gulp.task("copy", function () {
	return gulp.src([
		"source/fonts/**/*.{woff,woff2}",
		"source/img/**",
		"source/js/**",
		"source/*ico"
	], {
		base: "source"
	})
	.pipe(gulp.dest("build/"));
});

/* gulp server - запускает сервер через папку build */
gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  /* слежка за файлами которые надо перезапустить */
  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("build", "refresh"));
});

/* gulp refresh - перезапускает сервер */
gulp.task("refresh", function (done) {
	server.reload();
	done();
});

/* gulp build - запускает команды, которые перечислены ниже */
gulp.task("build", gulp.series(
	"clean", 
	"copy",   
	"css",
	"sprite",
	"html"
));

/* gulp start - запускает команды, которые перечислены в папке build и запускает сервер */
gulp.task("start", gulp.series("build", "server"));