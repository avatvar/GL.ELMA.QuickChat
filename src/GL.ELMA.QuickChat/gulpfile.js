// Include gulp
var gulp = require("gulp");

// Include Our Plugins
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

//transpile ES6 into ES5
gulp.task("scripts", function () {
    return gulp.src(["wwwroot/components/*.jsx"])
		.pipe(babel({ presets: ["react", "es2016"]
		}))
        .pipe(concat("components.js"))
        //.pipe(jshint())
        .pipe(rename("components.min.js"))
        //.pipe(uglify())
        .pipe(gulp.dest("wwwroot/components"));
});

// Watch Files For Changes
gulp.task("watch", function () {
    gulp.watch(["wwwroot/components/*.jsx"], ["scripts"]);
});

// Default Task
gulp.task("default", ["scripts", "watch"]);