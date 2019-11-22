import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from "rollup-plugin-terser";


export default [{
    input: './src/main.js',
    output: [{
        file: '../demo/demo/sdk/AnalysysAgent_WX_SDK.min.js',
        format: 'cjs',
        name: 'Ans',
        plugins: [uglify({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: '../demo/demo/sdk/AnalysysAgent_WX_SDK.es6.min.js',
        format: 'esm',
        name: 'Ans',
        plugins: [terser({
            'mangle': {
                toplevel: true
            }
        })]
    }],
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        eslint({
            exclude: [
                'src/**',
            ]
        }),
        babel({
            exclude: 'node_modules/**',
        })
    ],
    sourceMap: true
}, {
    input: './src/main_plugin.js',
    output: [{
        file: '../demo/demoPlugin/sdk/AnalysysAgent_WX_SDK.plugin.min.js',
        format: 'cjs',
        name: 'Ans',
        plugins: [uglify({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: '../demo/demoPlugin/sdk/AnalysysAgent_WX_SDK.plugin.es6.min.js',
        format: 'esm',
        name: 'Ans',
        plugins: [terser({
            'mangle': {
                toplevel: true
            }
        })]
    }],
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        eslint({
            exclude: [
                'src/**',
            ]
        }),
        babel({
            exclude: 'node_modules/**',
        })
    ],
    sourceMap: true
}, {
    input: './src/main_custom.js',
    output: [{
        file: '../demo/demoTaro/sdk/AnalysysAgent_WX_SDK.custom.min.js',
        format: 'cjs',
        name: 'Ans',
        plugins: [uglify({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: '../demo/demoTaro/sdk/AnalysysAgent_WX_SDK.custom.es6.min.js',
        format: 'esm',
        name: 'Ans',
        plugins: [terser({
            'mangle': {
                toplevel: true
            }
        })]
    }],
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        eslint({
            exclude: [
                'src/**',
            ]
        }),
        babel({
            exclude: 'node_modules/**',
        })
    ],
    sourceMap: true
}];