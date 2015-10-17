'use strict';

var source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),

    // Browserify
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    babelify = require('babelify'),

    // Gulp plugins
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),

    // Utility
    assign = require('lodash').assign

module.exports = function (gulp, server) {
    var bundler = browserify(assign({}, watchify.args, {
            entries: ['./src/js/app/app.jsx'],
            transform: [babelify, reactify],
            debug: true
        })),
        watcher = watchify(bundler)

    gulp.task('browserify:development', bundle)

    watcher.on('update', bundle)
    watcher.on('log', gutil.log)

    function bundle() {
        var b = watcher.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('app.jsx'))
            .pipe(buffer())
            // optional, remove if you dont want sourcemaps
               // Add transformation tasks to the pipeline here.
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify({
                compress: false
            }))
            .pipe(rename('app.js'))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'))

        if (server) {
            b.pipe(server.reload())
        }
    }
}
