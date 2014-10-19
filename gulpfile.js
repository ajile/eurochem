'use strict';

var gulp = require('gulp');
var ignore = require('gulp-ignore');
var jshint = require('gulp-jshint');

var gutil = require("gulp-util");
// var docco = require("gulp-docco");
var jsdoc = require("gulp-jsdoc");
var rename = require("gulp-rename");
var concat = require("gulp-concat");

var deploy = require('gulp-gh-pages');


var appPath = './app/**/*.js';

// Lint JavaScript
gulp.task('lint', function () {
    return gulp.src(appPath)
        .pipe(ignore.exclude(/vendor\/*/))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// gulp.task("docs", function(){
//     return gulp.src(appPath)
//         .pipe(ignore.exclude(/vendor\/*/))
//         .pipe(docco())
//         .pipe(gulp.dest("doc"));
// });


gulp.task("docs", function(){
    return gulp.src(appPath)
        .pipe(ignore.exclude(/vendor\/*/))
        .pipe(jsdoc('./doc'));
});


gulp.task('put_docs', function () {
    return gulp.src('./doc/**/*')
        .pipe(deploy());
});


gulp.task('deploy', ['docs', 'put_docs']);
