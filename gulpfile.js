var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlMinifier = require('html-minifier');
var inlineNg2Template = require('gulp-inline-ng2-template');
var merge = require('merge2');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var revdel = require('gulp-rev-delete-original');
var runSequence = require('run-sequence');
// var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');

var ngc = require('gulp-ngc');
var Q = require('q');
var rollup = require( 'rollup' );

var tsProject = ts.createProject('tsconfig.prod.json');

gulp.task('default', function(callback) {
  runSequence(
      'clean:dist', 'compile:ts', 'call:namespace', 'gen:assets',
      'bundle:rollup', 'cache:bust', 'bundle:zip', callback);
});

gulp.task('aot', function(callback) {
  runSequence(
      'clean:dist', 'compile:aot', 'call:namespace:aot', 'gen:assets',
      'set:aot', 'bundle:rollup', 'cache:bust', 'bundle:zip', callback);
});

gulp.task('clean:dist', function() {
    return gulp.src('dist', { read: false }).pipe(clean());
});

gulp.task('call:namespace', allowNamespaceCall.bind(null, false));
gulp.task('call:namespace:aot', allowNamespaceCall.bind(null, true));

function allowNamespaceCall(aot){
    var src = aot?'src/**/*.js':'dist/src/**/*.js';
    var dest = aot?'src':'dist/src';

    return gulp.src(src)
        .pipe(replace('import * as moment', 'import moment'))
        .pipe(gulp.dest(dest));
}

// Compile TypeScript to JS
gulp.task('compile:ts', function() {
    // We must inline templates/styles before invoking rollup because
    // the rollup-plugin-angular could not handle template/style urls
    // relatives to the moduleId
    return tsProject.src()
        .pipe(inlineNg2Template({
            base: '/src/app',
            target: 'es6',
            indent: 0,
            useRelativePaths: true,
            removeLineBreaks: true,
            templateProcessor: minifyTemplate,
            styleProcessor: minifyTemplate
        }))
        .pipe(tsProject())
        .pipe(gulp.dest('dist/src/app'));
});

gulp.task('compile:aot', function() {
    return ngc('tsconfig.prod-aot.json')
        .pipe(gulp.dest('dist/src/app'));
});

gulp.task('gen:assets', function() {
    return merge([
        gulp.src('src/assets/**/*').pipe(gulp.dest('dist/public/assets')),
        gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
            'node_modules/primeui/primeui-ng-all.min.css',
            'node_modules/quill/dist/quill.snow.css',
            'node_modules/quill/dist/quill.bubble.css'
        ]).pipe(gulp.dest('dist/public/assets/css')),

        gulp.src('node_modules/primeui/themes/redmond/theme.css')
            .pipe(rename('primeui-redmond-theme.css')).pipe(gulp.dest('dist/public/assets/css')),

        gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.min.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/quill/dist/quill.min.js'
        ]).pipe(concat('polyfills.js')).pipe(uglify()).pipe(gulp.dest('dist/public')),

        gulp.src('src/*.ico').pipe(gulp.dest('dist/public')),
        gulp.src('src/index-public.html').pipe(rename('index.html')).pipe(gulp.dest('dist/public')),
        gulp.src('src/environments/**/*.json').pipe(gulp.dest('dist/public/environments')),
        gulp.src('src/app/**/*.json').pipe(gulp.dest('dist/public/app'))
    ]);
});

gulp.task('set:aot', function() {
    return process.env.AOT = 'true';
});

gulp.task('bundle:rollup', function() {
    var deferred = Q.defer();
    var config = require( './rollup.config.es5.js' );
    rollup.rollup(config).then( function ( bundle ) {

        bundle.write({
            dest: 'dist/public/app.js',
            sourceMap: false,
            format: 'iife',
            globals: {
                'process': 'process'
            }
        });

        deferred.resolve();
    });

    return deferred.promise;
});

gulp.task('bundle:hash', function(){
  return gulp.src(['dist/public/polyfills.js', 'dist/public/app.js'])
    .pipe(rev())
    .pipe(revdel())
    .pipe(gulp.dest('dist/public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/public'))
})

gulp.task('cache:bust', ['bundle:hash'], function(){
  var manifest = gulp.src('dist/public/rev-manifest.json');
 
  return gulp.src('dist/public/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('dist/public'));
});

gulp.task('bundle:zip', function() {
    return gulp.src(['dist/public/polyfills*.js', 'dist/public/app*.js'])
        .pipe(gzip({ gzipOptions: { level: 9 } }))
        .pipe(gulp.dest('dist/public'));
});

function minifyTemplate(path, ext, file, callback) {
    try {
        var minifiedFile = htmlMinifier.minify(file, {
            collapseWhitespace: true,
            caseSensitive: true,
            removeComments: true,
            removeRedundantAttributes: true
        });
        callback(null, minifiedFile);
    }
    catch (err) {
        callback(err);
    }
}