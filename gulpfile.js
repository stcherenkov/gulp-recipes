'use strict';

var gulp = require('gulp'),
    connect = require('./gulp/serve')(gulp)

require('./gulp/browserify')(gulp, connect)
require('./gulp/webpack')(gulp, connect)
require('./gulp/css')(gulp)
require('./gulp/template')(gulp, connect)

gulp.task('default', ['browserify:development', 'css', 'template', 'serve:development']);
