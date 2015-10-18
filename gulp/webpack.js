var gutil = require('gulp-util'),
    path = require('path'),
    _ = require('lodash'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),

    sharedConfig = {
        context: path.join(__dirname, '..', 'src'),
        entry: './js/app/app.jsx',
        output: {
            path: path.join(__dirname, '..', 'build'),
            filename: 'app.js'
        },
        resolve: {
            root: path.join(__dirname, '..', 'src', 'js', 'app'),
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
    }

module.exports = function (gulp) {
    gulp.task('webpack:development', function (callback) {
        var bundler = webpack(_.extend({}, sharedConfig, {
            watch: true,
            plugins: [
                new webpack.SourceMapDevToolPlugin()
            ]
        }))
        
        new WebpackDevServer(bundler, {
            contentBase: 'build/',
            stats: {
                chunks: false
            }
        }).listen(4242, 'localhost', function (err) {
            if (err) {
                throw new gutil.PluginError('Webpack', err)
            }

            gutil.log(gutil.colors.cyan('[Webpack]'), 'server avaliable at http://localhost:4242/')
        })
    })

    gulp.task('webpack:production', function (callback) {
        webpack(_.extend({}, sharedConfig, {
            plugins: [
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin()
            ]
        }), function(err, stats) {
            if (err) {
                throw new gutil.PluginError('Webpack', err)
            }

            gutil.log(gutil.colors.cyan('[Webpack]'), 'Output:\n' + stats.toString({
                chunks: false
            }))
            callback()
        })
    })
}
