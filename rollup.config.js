import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'
import replace from 'rollup-plugin-replace'
import path from 'path'
import dotenv from 'dotenv'

// 加载.env文件
dotenv.config()

// 判断是否开发环境
const isDev = process.env.NODE_ENV === 'development'

// 根据环境加载对应的.env.xx文件
dotenv.config({
  override: true,
  path: path.join(__dirname, isDev ? '.env.development' : '.env.production')
})

const pathResolve = p => path.join(__dirname, p)

function changePath() {
  return {
    name: 'changePath',
    transform: function transform(code, id) {
      code = code
        .replace(/\$ANS/g, process.env.ANS)
        .replace(/\$LIB/g, process.env.LIB)
        .replace(/\$LibVERSION/g, process.env.LibVERSION)
      return {
        code: code,
        id: id,
      }
    },
  }
}

function getPlugins () {
  return [
    changePath(),
    typescript(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: ['src/**'],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    !isDev && terser({
      mangle: {
        toplevel: true,
      },
    })
  ]
}

export default [{
  input: './src/index.ts',
  output: [{
    file: './demo/demo/sdk/AnalysysAgent_WX_SDK.min.js',
    format: 'cjs',
    name: 'Ans'
  }, {
    file: './dist/AnalysysAgent_WX_SDK.min.js',
    format: 'cjs',
    name: 'Ans'
  }, {
    file: './demo/demo/sdk/AnalysysAgent_WX_SDK.es6.min.js',
    format: 'esm',
    name: 'Ans'
  }, {
    file: './dist/AnalysysAgent_WX_SDK.es6.min.js',
    format: 'esm',
    name: 'Ans'
  }],
  plugins: getPlugins(),
  sourceMap: true,
}, {
  input: './src/indexPlugin.ts',
  output: [{
    file: './demo/demoPlugin/sdk/AnalysysAgent_WX_SDK.plugin.min.js',
    format: 'cjs',
    name: 'Ans'
  }, {
    file: './dist/AnalysysAgent_WX_SDK.plugin.min.js',
    format: 'cjs',
    name: 'Ans'
  }, {
    file: './demo/demoPlugin/sdk/AnalysysAgent_WX_SDK.plugin.es6.min.js',
    format: 'esm',
    name: 'Ans'
  }, {
    file: './dist/AnalysysAgent_WX_SDK.plugin.es6.min.js',
    format: 'esm',
    name: 'Ans'
  }],
  plugins: getPlugins(),
  sourceMap: true,
}, {
  input: './src/indexCustom.ts',
  output: [{
    file: './demo/taro/sdk/AnalysysAgent_WX_SDK.custom.min.js',
    format: 'cjs',
    name: 'Ans'
  }, {
    file: './dist/AnalysysAgent_WX_SDK.custom.min.js',
    format: 'cjs',
    name: 'Ans'
  }, {
    file: './demo/taro/sdk/AnalysysAgent_WX_SDK.custom.es6.min.js',
    format: 'esm',
    name: 'Ans'
  }, {
    file: './dist/AnalysysAgent_WX_SDK.custom.es6.min.js',
    format: 'esm',
    name: 'Ans'
  }],
  plugins: getPlugins(),
  sourceMap: true
}]
