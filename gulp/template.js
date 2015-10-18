'use strict'

var watch = require('gulp-watch'),
    path = require('path'),
    SRC_PATH = path.join(__dirname, '..', 'src'),
    BUILD_PATH = path.join(__dirname, '..', 'build')

module.exports = function (gulp, server) {
    gulp.task('template', function () {
        var templates = path.join(SRC_PATH, '*.html'),

            task = gulp.src(templates, {base: SRC_PATH})
                .pipe(watch(templates, {base: SRC_PATH}))
                .pipe(gulp.dest(BUILD_PATH))

        if (server) {
            task.pipe(server.reload())
        }
    })
}
