var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var config = require('../config').test;
var handleErrors = require('../util/handleErrors');

gulp.task('test', function() {
    return gulp.src([config.testUrl], {read: false})
        .pipe(mocha(config.options))
        .on('error', handleErrors);
});

gulp.task('watch-test', function() {
    gulp.watch([config.srcUrl, config.testUrl], ['test']);
});
