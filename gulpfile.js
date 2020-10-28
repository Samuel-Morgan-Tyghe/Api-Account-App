var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

gulp.task("compile-sass", function () {
  return gulp
    .src("./src/Sass/*.sass")
    .pipe(sass())
    .pipe(gulp.dest("./src/Css"));
});

gulp.task("watch-sass", function () {
  gulp.watch("./src/Sass/*.sass", gulp.series("compile-sass"));
});

gulp.task("serve", function () {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "/",
    },
  });
  gulp.watch("./src/Sass/*.sass").on("change", reload);
});

gulp.task("default", gulp.series("watch-sass", "serve"));
