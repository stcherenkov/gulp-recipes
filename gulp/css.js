'use strict';

var path = require('path'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),

    SRC = path.join(__dirname, '..', 'src')

module.exports = function (gulp) {

    // Include bootstrap build tasks
    // require('gulp-grunt')(gulp, {
    //     base: path.join(__dirname, '..', 'src', 'third-party', 'bootstrap'),
    //     prefix: 'bootstrap:'
    // })

    gulp.task('css:main', function () {
        gulp.src('./src/styles/**/*.css')
            .pipe(concat('main.css'))
            .pipe(gulp.dest('./build/css/'))
    })

    gulp.task('css:development', ['css:main'], function () {
        gulp.watch('./src/styles/**/*.css', ['css:main'])
    })

    gulp.task('css:vendor', function () {
        gulp.src(['./src/third-party/bootstrap/dist/css/bootstrap.min.css'])
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest('./build/css/'))
    })
}
