//app.js    这个demo 在 app.json  和 index.json 配置了插件，引用基础版本sdk 会报错。不允许更改App 和 Page
let AnalysysAgent = require("./sdk/AnalysysAgent_WX_SDK.plugin.min.js")   //插件版本 sdk
let AnalysysEncryption = require("./sdk/AnalysysAgent_encryption.min.js")   //加密板块，需要的话单独引入。
AnalysysAgent.encrypt = AnalysysEncryption;

//es6版本
// import AnalysysAgent from './sdk/AnalysysAgent_WX_SDK.plugin.es6.min.js'
// import * as AnalysysEncryption  from './sdk/AnalysysAgent_encryption.es6.min.js'
// AnalysysAgent.encrypt = AnalysysEncryption

AnalysysAgent.debugMode = 2
AnalysysAgent.appkey = 'sdktest201'
AnalysysAgent.uploadURL = 'https://arkpaastest.analysys.cn:4089'
AnalysysAgent.encryptType = 1;  // 使用加密模块就可以放开，设置加密模式的
AnalysysAgent.autoShare = true;
// AnalysysAgent.autoProfile = true;
AnalysysAgent.auto = true;
AnalysysAgent.autoTrack = true;

AnalysysAgent.allowTimeCheck = true;
AnalysysAgent.maxDiffTimeInterval = 1;

AnalysysAgent.identify("userName", true)
// AnalysysAgent.alias("1")/



let App = AnalysysAgent.App



App({
    onLaunch: function (options) {
        // console.log('APP---onLaunch--->', options)
        if (options.shareTicket) {
            wx.getShareInfo({
                shareTicket: options.shareTicket,
                success: function (res) {
                    //解密res.encryptedDat
                    // AnalysysAgent.appProperty({ 'openGId': 123256465 })
                }
            })
        }
    },
    onShow: function (options) {
        // console.log('APP---onShow--->', options)
        // AnalysysAgent.appStart(options)
        // if (options.shareTicket) {
        //   wx.getShareInfo({
        //     shareTicket: options.shareTicket,
        //     success: function (res) {
        //       //解密res.encryptedDat
        //       console.log('获取成功--->', res)
        //       // AnalysysAgent.appProperty({ 'openGId': 123256465 })
        //     }
        //   })
        // }
    },
    globalData: {
        userInfo: null
    }
})