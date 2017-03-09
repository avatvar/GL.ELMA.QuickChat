var gulp = require("gulp");

var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var newer = require("gulp-newer");
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var normalize = require('node-normalize-scss');
var gulpUtil = require('gulp-util');

var onError = function (err) {
    notify.onError({
        title: "Error",
        message: "<%= error %>"
    })(err);
    this.emit("end");
};

var plumberOptions = {
    errorHandler: onError
};

gulp.task("scripts", function () {
    return gulp.src(["wwwroot/react/**/*.jsx", "node_modules/dateformat/lib/dateformat.js"])
		.pipe(babel({
		    presets: ["react", "es2015-without-strict"]
		}))
        .pipe(concat("quickChat.js"))
        //.pipe(jshint())
        .pipe(rename("quickChat.min.js"))
        //.pipe(uglify())
        .pipe(gulp.dest("wwwroot/js"));
});

gulp.task("copy-redux-logger", function () {
    return gulp.src("node_modules/redux-logger/dist/index.min.js")
      .pipe(newer("wwwroot/lib/index.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});

gulp.task("copy-react-redux", function () {
    return gulp.src("node_modules/react-redux/dist/react-redux.min.js")
      .pipe(newer("wwwroot/lib/react.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});

gulp.task("copy-redux", function () {
    return gulp.src("node_modules/redux/dist/redux.min.js")
      .pipe(newer("wwwroot/lib/react.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});

gulp.task("copy-redux-thunk", function () {
    return gulp.src("node_modules/redux-thunk/dist/redux-thunk.min.js")
      .pipe(newer("wwwroot/lib/react.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});

gulp.task("copy-react", function () {
    return gulp.src("node_modules/react/dist/react.min.js")
      .pipe(newer("wwwroot/lib/react.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});
gulp.task("copy-react-dom", function () {
    return gulp.src("node_modules/react-dom/dist/react-dom.min.js")
      .pipe(newer("wwwroot/lib/react-dom.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});
gulp.task("copy-signalr", function () {
    return gulp.src("node_modules/signalr/jquery.signalR.min.js")
      .pipe(newer("wwwroot/lib/jquery.signalR.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});
gulp.task("copy-jquery", function () {
    return gulp.src("node_modules/jquery/dist/jquery.min.js")
      .pipe(newer("wwwroot/lib/jquery.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});
gulp.task("copy-bootstrap", function () {
    return gulp.src("node_modules/bootstrap/dist/css/bootstrap.min.css")
      .pipe(newer("wwwroot/lib/bootstrap.css"))
      .pipe(gulp.dest("wwwroot/lib"));
});
gulp.task("copy-handlebars", function () {
    return gulp.src("node_modules/handlebars/dist/handlebars.min.js")
      .pipe(newer("wwwroot/lib/handlebars.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});

gulp.task("copy-list.js", function () {
    return gulp.src("node_modules/list.js/dist/list.min.js")
      .pipe(newer("wwwroot/lib/list.min.js"))
      .pipe(gulp.dest("wwwroot/lib"));
});

gulp.task('sass', function () {
    var autoprefixerOptions = {
        browsers: ['last 2 versions'],
        cascade: false
};

    var filterOptions = "**/*.css";

    var sassOptions = {
        includePaths: [

        ]
    };
    return gulp.src('wwwroot/sass/**/*.scss')
        .pipe(plumber(plumberOptions))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('wwwroot/css'))
        .pipe(filter(filterOptions));
});

gulp.task('watch', function () {
    gulp.watch('wwwroot/components/**/*.jsx}', ['scripts']);
    gulp.watch('wwwroot/sass/*.scss', ['sass']);
});

gulp.task("copy", ["copy-react", "copy-react-dom", "copy-signalr", "copy-jquery", "copy-bootstrap", "copy-handlebars", "copy-list.js", "copy-redux-thunk", "copy-react-redux", "copy-redux", "copy-redux-logger"]);
gulp.task("build", ["copy", "scripts", "sass"]);
gulp.task("default", ["copy", "scripts", "sass", "watch"]);