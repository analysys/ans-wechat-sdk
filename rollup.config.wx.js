import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from "rollup-plugin-terser";
import replace from 'rollup-plugin-replace';
import path from 'path';

const pathResolve = p => path.join(__dirname, p)

function changePath () {
    return {
        name: 'changePath',
        transform: function transform (code, id) {
            code = code.replace(/\@Storage/g, pathResolve('./src/ProgramDiff/WX/storage'))
                .replace(/\@Device/g, pathResolve('./src/ProgramDiff/WX/device'))
                .replace(/\@Fetch/g, pathResolve('./src/ProgramDiff/WX/fetch'))
                .replace(/\@Router/g, pathResolve('./src/ProgramDiff/WX/router'))
                .replace(/\$ANS/g, 'WX')
                .replace(/\$LIB/g, 'WeChat')
                .replace(/\$LibVERSION/g, '4.3.9');
            return {
                code: code,
                id: id
            }
        }
    }
}



export default [{
    input: './src/main.js',
    output: [{
        file: './demo/demo/sdk/AnalysysAgent_WX_SDK.min.js',
        format: 'cjs',
        name: 'Ans',
        plugins: [uglify({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: './sdk/AnalysysAgent_WX_SDK.min.js',
        format: 'cjs',
        name: 'Ans',
        plugins: [uglify({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: './demo/demo/sdk/AnalysysAgent_WX_SDK.es6.min.js',
        format: 'esm',
        name: 'Ans',
        plugins: [terser({
            'mangle': {
                toplevel: true
            }
        })]
    }, {
        file: './sdk/AnalysysAgent_WX_SDK.es6.min.js',
        format: 'esm',
        name: 'Ans',
        plugins: [terser({
            'mangle': {
                toplevel: true
            }
        })]
    }],
    plugins: [
        changePath(),
        replace({
            $ans: 'wx',
            delimiters: ['', '']
        }),
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
        file: './demo/demoPlugin/sdk/AnalysysAgent_WX_SDK.plugin.min.js',
        format: 'cjs',
        name: 'Ans',
        plugins: [uglify({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: './sdk/AnalysysAgent_WX_SDK.plugin.min.js',
        format: 'cjs',
        name: 'Ans',
        plugins: [uglify({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: './demo/demoPlugin/sdk/AnalysysAgent_WX_SDK.plugin.es6.min.js',
        format: 'esm',
        name: 'Ans',
        plugins: [terser({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: './sdk/AnalysysAgent_WX_SDK.plugin.es6.min.js',
        format: 'esm',
        name: 'Ans',
        plugins: [terser({
            'mangle': {
                toplevel: true
            }
        })]
    }],
    plugins: [
        changePath(),
        replace({
            $ans: 'wx',
            delimiters: ['', '']
        }),
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
        file: './demo/demoTaro/sdk/AnalysysAgent_WX_SDK.custom.min.js',
        format: 'cjs',
        name: 'Ans',
        plugins: [uglify({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: './sdk/AnalysysAgent_WX_SDK.custom.min.js',
        format: 'cjs',
        name: 'Ans',
        plugins: [uglify({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: './demo/demoTaro/sdk/AnalysysAgent_WX_SDK.custom.es6.min.js',
        format: 'esm',
        name: 'Ans',
        plugins: [terser({
            'mangle': {
                toplevel: true
            }
        })]
    },
    {
        file: './sdk/AnalysysAgent_WX_SDK.custom.es6.min.js',
        format: 'esm',
        name: 'Ans',
        plugins: [terser({
            'mangle': {
                toplevel: true
            }
        })]
    }],
    plugins: [
        changePath(),
        replace({
            $ans: 'wx',
            delimiters: ['', '']
        }),
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