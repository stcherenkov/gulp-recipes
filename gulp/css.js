'use strict';

var concat = require('gulp-concat')

module.exports = function (gulp) {
    // I added this so that you see how to run two watch tasks
    gulp.task('css', function () {
        gulp.watch('styles/**/*.css', function () {
            return gulp.src('styles/**/*.css')
                .pipe(concat('main.css'))
                .pipe(gulp.dest('./build/'))
        })
    })
}
