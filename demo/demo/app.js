//app.js
// let AnalysysAgent = require('./sdk/AnalysysAgent_WX_SDK.min.js') //基础版本 sdk
let AnalysysEncryption = require('./sdk/AnalysysAgent_encryption.min.js') //加密板块，目前与sdk分开，为了缩小sdk的体积。需要的话单独引入。
AnalysysAgent.encrypt = AnalysysEncryption

import AnalysysAgent from  './sdk/AnalysysAgent_WX_SDK.es6.min.js';

AnalysysAgent.registerSuperProperty('sfsf', 1)


AnalysysAgent.identify('openid123123')
AnalysysAgent.init({
  appkey: '47fce41a0472c616',
  uploadURL: 'https://uba-up.analysysdata.com',
  debugMode: 2,
  $appname: 'test_appname',
  $appid: 'test_app_id',
  autoPageViewDuration: true,
  autoShare: false,
  autoTrack: true,
  allowTimeCheck: true
})



AnalysysAgent.onReady = function(config) {
  console.log('sdk已准备就绪')
}

AnalysysAgent.onBeforeStartUp = function (res) {
  console.log('开始发送预制启动事件')
}

AnalysysAgent.onAfterStartUp = function (res) {
  console.log('预制启动事件发送成功')
}

App({
  onLaunch: function(options) {
   
    if (options.shareTicket) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function(res) {
          //解密res.encryptedDat
          // AnalysysAgent.appProperty({ 'openGId': 123256465 })
        },
      })
    }
  },
  onShow: function(options) {
    console.log('onshow+111')
  },
  onHide: function () {
    console.log('onhide+2222')
  },
  globalData: {
    userInfo: null,
  },
})
