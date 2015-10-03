var gulp = require("gulp"),
    pluginsFactory = require("gulp-load-plugins");

var plugins = pluginsFactory();

var tsConfig = {
    "module": "umd",
    target: "ES5",
    experimentalDecorators: true,
    noImplicitAny: true
};

gulp.task("ts", function () {
    return gulp.src([
        "**/*.ts",
        "!node_modules/**/*.ts"
    ])
        .pipe(plugins.tsc(tsConfig))
        .pipe(gulp.dest("."));
});

gulp.task("default", ["ts"]);