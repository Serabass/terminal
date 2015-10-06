var gulp = require("gulp"),
    pluginsFactory = require("gulp-load-plugins");

var plugins = pluginsFactory();

var tsConfig = {
    "module": "commonjs",
    target: "ES5",
    experimentalDecorators: true,
    noImplicitAny: true,
    sourceMap: true
};

gulp.task("ts", function () {
    return gulp.src([
        "**/*.ts",
        "!node_modules/**/*.ts"
    ])
        .pipe(plugins.tsc(tsConfig))
        .pipe(gulp.dest("dest"));
});

gulp.task("default", ["ts"]);