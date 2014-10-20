var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var nodemonConfig = require('../../nodemon.json');

gulp.task('develop', ['lint', 'watch'], function () {
    nodemon(nodemonConfig)
    .on('change', ['lint'])
    .on('restart', function () {
        console.log('restarted!')
    });
});