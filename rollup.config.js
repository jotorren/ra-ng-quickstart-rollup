import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const EVENT = process.env.npm_lifecycle_event || '';
const MAP = EVENT.includes('map');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const AOT = process.env.AOT === 'true' || EVENT.includes('aot');

console.log('process.env.ENV: [' + ENV + ']');
console.log('sourceMap: [' + MAP + ']');
console.log('AoT: [' + AOT + ']');

export default {
    entry: AOT? 'src/app/main-aot.js':'dist/src/app/main.js',
    dest: 'dist/public/app.js', // output a single application bundle
    sourceMap: MAP,
    format: 'iife',
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        nodeResolve({ jsnext: true, module: true }),
        commonjs({
            include: ['node_modules/rxjs/**',
                'node_modules/primeng/**', 'node_modules/log4javascript/**', 'node_modules/lodash/**',
                'node_modules/crypto-js/**'],

            namedExports: {
                'node_modules/primeng/primeng.js': ['MessagesModule', 'GrowlModule', 'PanelModule', 'DropdownModule',
                    'ToggleButtonModule', 'BreadcrumbModule', 'ConfirmDialogModule', 'ConfirmationService'],
                'node_modules/log4javascript/log4javascript.js': ['AjaxAppender', 'AlertAppender', 'BrowserConsoleAppender',
                    'NullLayout', 'SimpleLayout', 'PatternLayout', 'XmlLayout', 'JsonLayout', 'HttpPostDataLayout',
                    'setEnabled', 'getLogger', 'getRootLogger', 'Level', 'Logger'],
                'node_modules/lodash/lodash.js': ['find'],
                'node_modules/crypto-js/index.js': ['AES', 'enc']
            }
        }),
        (ENV === 'production' && uglify())
    ],
    external: [ 'process' ],
    globals: {
        'process' : 'process'
    }
}