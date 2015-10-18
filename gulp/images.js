'use strict'

module.exports = function (gulp) {
    gulp.task('images', function () {
        return gulp.src('./src/img/**/*.png', {base: './src/img/'})
            .pipe(gulp.dest('./build/img/'))
    })
}
