// Include gulp
var gulp = require("gulp");

// Include Our Plugins
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sass = require("gulp-sass");

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

gulp.task('sass', function () {
    gulp.src('wwwroot/sass/site.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(rename("quickChat.min.css"))
      .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('wwwroot/sass/*.scss', ['sass']);
});

gulp.task("scripts:watch", function () {
    gulp.watch(["wwwroot/components/*.jsx"], ["scripts"]);
});

gulp.task("default", ["scripts", "scripts:watch", "sass", "sass:watch"]);