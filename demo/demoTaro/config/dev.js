module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  weapp: {
    compile: {
      exclude: ['src/sdk/AnalysysAgent_WX_SDK.custom.min.js']
    }
  },
  h5: {}
}
