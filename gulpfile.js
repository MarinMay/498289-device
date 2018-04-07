"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var server = require("browser-sync").create();
var run = require("run-sequence");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var ghPages = require("gulp-gh-pages");

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function() {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("copy", function() {
  return gulp.src([
    "font/**/*.{woff,woff2}",
    "img/**",
    "css/normalize.css",
    "js/**/*.min.js"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("copyJS", function() {
  return gulp.src([
    "js/**/*.min.js"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("jsmin", function() {
  return gulp.src(["js/**/*.js", "!js/**/*.min.js"])
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "jsmin",
    "html",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.scss", ["style"]);
  gulp.watch("*.html", ["html"]);
  gulp.watch("js/**/*.js", ["jsmin"]);
  gulp.watch("js/**/*.min.js", ["copyJS"]);

  gulp.watch("build/**/*.html").on('change', server.reload);
  gulp.watch("build/css**/*.css").on('change', server.reload);
  gulp.watch("build/js/**/*.js").on('change', server.reload);
});

gulp.task("sprite", function() {
  return gulp.src("img/icon/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("img"));
});

gulp.task("images", function() {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("img"));
});

gulp.task("deploy", function() {
  return gulp.src("./build/**/*")
    .pipe(ghPages());
});
