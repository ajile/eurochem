/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

'use strict';

var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });





// var gulp = require('gulp');
// var ignore = require('gulp-ignore');
// var jshint = require('gulp-jshint');

// var gutil = require("gulp-util");
// // var docco = require("gulp-docco");
// var jsdoc = require("gulp-jsdoc");
// var rename = require("gulp-rename");
// var concat = require("gulp-concat");

// var deploy = require('gulp-gh-pages');

// var browserify = require('browserify');
// var source = require('vinyl-source-stream');


// var serverPath = './server/**/*.js';
// var clientPath = './client/**/*.js';

// // Lint JavaScript (server)
// gulp.task('lint_server', function () {
//     return gulp.src(serverPath)
//         .pipe(ignore.exclude(/vendor\/*/))
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// // Lint JavaScript (client)
// gulp.task('lint_client', function () {
//     return gulp.src(clientPath)
//         .pipe(ignore.exclude(/vendor\/*/))
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });





// gulp.task("build_docs", function(){
//     return gulp.src(serverPath)
//         .pipe(ignore.exclude(/vendor\/*/))
//         .pipe(jsdoc('./doc'));
// });


// gulp.task('spread_docs', function () {
//     return gulp.src('./doc/**/*')
//         .pipe(deploy());
// });



// gulp.task('browserify', function() {
//     return gulp.src('./client/app.js')
//         .pipe(browserify().bundle())
//         // Передаем имя файла, который получим на выходе, vinyl-source-stream
//         .pipe(source('app.js'))
//         .pipe(gulp.dest('./server/public/javascripts/'));
// });



// gulp.task("build_client", ['browserify']);


// gulp.task('deploy', ['build_docs', 'spread_docs']);
// gulp.task('lint', ['lint_server', 'lint_client']);
// gulp.task('build', ['build_client']);
