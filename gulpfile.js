let gulp = require("gulp");
let babel = require("gulp-babel");

gulp.task("babel", () =>
    gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"))
);
