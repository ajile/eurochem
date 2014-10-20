var gulp = require('gulp');
var ignore = require('gulp-ignore');
var jshint = require('gulp-jshint');

var handleErrors = require('../util/handleErrors');
var config=require('../config').less;


// Lint JavaScript (server)
gulp.task('lint_server', function () {
    return gulp.src('./server/**/*.js')
        .pipe(ignore.exclude(/vendor\/*|public\/*/))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Lint JavaScript (client)
gulp.task('lint_client', function () {
    return gulp.src('./client/**/*.js')
        .pipe(ignore.exclude(/vendor\/*|bower_components/))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lint', ['lint_server', 'lint_client']);