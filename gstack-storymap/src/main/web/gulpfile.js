var gulp = require("gulp"),
    rollup = require('rollup'),
    copy = require('gulp-copy'),
    resolve = require('rollup-plugin-node-resolve')


const webroot = "../resources/static/",
    srcroot = './',
    paths = {
        js: {
            rollup: {
                src: srcroot + 'js/index.jsx',
                dest: srcroot + 'target/umd/es6/app.js',
            },
            es6: {
                src: srcroot + 'target/umd/es6',
                dest: srcroot + 'target/umd/es5.min',
            },
            dist: {
                src: srcroot + 'target/umd/**/*.js',
                dest: webroot + 'js',
            }

        }
    }


gulp.task('1 - Package all compiled JS (Rollup)',
    async cb => {

        const globals = {
            'jquery': 'jQuery',
            'react': 'React',
            'react-dom': 'ReactDOM',
            'redux': 'Redux',
            'redux-thunk': 'ReduxThunk',
            'react-redux': 'ReactRedux',
            'react-router': 'ReactRouter',
            'react-router-dom': 'ReactRouterDOM',
            'cross-fetch': 'fetch',
            'stompjs': 'Stomp',
            'sockjs-client': 'SockJS',
            'react-notification-system': 'ReactNotificationSystem',
            'react-markdown': 'reactMarkdown',
            'semantic-ui-react': 'semanticUIReact',
            'sortablejs': 'Sortable',
            'showdown': 'showdown',
            'js-cookie': 'Cookies',
            'prismjs': 'Prism',
            'react-mde': 'ReactMde',
        }
        const babel = require('rollup-plugin-babel')
        const bundle = await rollup.rollup({
            input: paths.js.rollup.src,
            external: Object.keys(globals),
            plugins: [
                babel({
                    exclude: 'node_modules/**'
                }),
                resolve({
                    module: false,
                    main: true,
                    preferBuiltins: false,
                    jsnext: false,
                    extensions: ['.mjs', '.js', '.jsx', '.json'],
                }),
            ]
        })


        await bundle.write({
            file: paths.js.rollup.dest,
            format: 'umd',
            globals,

        })
    })

gulp.task('2 - Compile bundled js into previous version of Javascript',
    gulp.series(
        ['1 - Package all compiled JS (Rollup)'],
        function () {
            const babel = require('gulp-babel')
            return gulp.src(paths.js.es6.src)
                .pipe(babel({
                    presets: ['babel-preset-es2015', 'stage-3'],
                    comments: false,
                    minified: true,
                    compact: false,
                    sourceMaps: true,
                    retainLines: false,
                }))
                .pipe(gulp.dest(paths.js.es6.dest))
        }))

gulp.task('3 - Copy dist files to static folder',
    gulp.series(
        ['2 - Compile bundled js into previous version of Javascript'],
        // ['2 - Package all compiled JS (Rollup)'],
        function () {
            return gulp
                .src([paths.js.dist.src])
                .pipe(copy(paths.js.dist.dest, {prefix: 2}))
        }))
