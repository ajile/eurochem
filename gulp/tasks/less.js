var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var handleErrors = require('../util/handleErrors');
var config=require('../config').less;

gulp.task('less', function () {
    return gulp.src(config.src)
        // .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssmin())
        // .pipe(sourcemaps.write('./'))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dest));
});
