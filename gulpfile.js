const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "./dist",
    },
  });

  gulp.watch("./src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
  .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("styles"));
  gulp.watch("./src/*.html").on("change", gulp.parallel("html"));
  // gulp.watch("./src/js/**/*.js").on("change", gulp.parallel("scripts"));
  gulp.watch("./src/fonts/**/*").on("all", gulp.parallel("fonts"));
  gulp.watch("./src/icons/**/*").on("all", gulp.parallel("icons"));
  gulp.watch("./src/img/**/*").on("all", gulp.parallel("images"));
  gulp.watch("./src/*.php").on("change", gulp.parallel("php"));
  gulp.watch("./src/js/**/*.js").on("change", gulp.parallel("webpack"));
});

gulp.task("html", function () {
  return gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

// gulp.task("scripts", function () {
//   return gulp
//     .src("./src/js/**/*.js")
//     .pipe(gulp.dest("dist/js"))
//     .pipe(browserSync.stream());
// });

gulp.task('webpack', function () {
  return gulp
    .src('src/js/script.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
  return gulp
    .src("./src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("icons", function () {
  return gulp
    .src("./src/icons/**/*")
    .pipe(gulp.dest("dist/icons"))
    .pipe(browserSync.stream());
});

gulp.task("images", function () {
  return gulp
    .src("./src/img/**/*")
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
});

gulp.task("php", function () {
  return gulp
    .src("./src/*.php")
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    // "scripts",
    "webpack",
    "fonts",
    "icons",
    "html",
    "images",
    "php"
  )
);
