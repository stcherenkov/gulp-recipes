var gutil = require('gulp-util'),
    path = require('path'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server')

module.exports = function (gulp, server) {
    gulp.task('webpack:development', function () {
        gutil.log('[webpack] dev')
    })

    gulp.task('webpack:production', function (callback) {
        webpack({
            // configuration
            context: path.join(__dirname, '..', 'src'),
            entry: './js/app/app.jsx',
            output: {
                path: path.join(__dirname, '..', 'build'),
                filename: 'app.js'
            },
            resolve: {
                root: path.join(__dirname, '..', 'src', 'js', 'app'),
                alias: {
                    mixins: './mixins',
                    models: './models',
                    collections: './collections',
                    views: './views'
                },
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
            },
            plugins: [
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin()
            ]
        }, function(err, stats) {
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
