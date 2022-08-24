//logs.js
const app = getApp()
let AnalysysAgent = wx.AnalysysAgent

Page({
  data: {},
  onShow: function() {
    AnalysysAgent.pageProperty({'page2':'property2'})
  },
  onHide: function () {
    console.log('onHide-next-11')
  },
  onUnload: function () {
    console.log('onUnload-next-11')
  },
  pageView: function() {
    var pageInfo = {
      "commodityName": "iPhone",
      "commodityPrice": 8000
    }
    AnalysysAgent.pageView("商品页", pageInfo)
  },
  alias: function() {
    AnalysysAgent.alias("sanban", "yiban")
  },
  identify: function() {
    AnalysysAgent.identify("userName")
  },
  reset: function() {
    AnalysysAgent.reset()
  },
  registerSuperProperty: function() {
    AnalysysAgent.registerSuperProperty("age", 20)
  },
  registerSuperProperties: function() {
    let superProperty = {
      "age": 20,
      "member": "VIP"
    }
    AnalysysAgent.registerSuperProperties(superProperty)
  },
  unRegisterSuperProperty: function() {
    AnalysysAgent.unRegisterSuperProperty("age")
  },
  clearSuperProperties: function() {
    AnalysysAgent.clearSuperProperties()
  },
  getSuperProperty: function() {
    AnalysysAgent.getSuperProperty("member")
  },
  getSuperProperties: function() {
    AnalysysAgent.getSuperProperties()
  },
  track: function() {
    let eventInfo = {
      "money": 2000
    }
    AnalysysAgent.track("payment", eventInfo)
  },
  profileSet: function() {
    let profiles = {
      "Email": "yonghu@163.com",
      "WeChatID": "微信号"
    }
    AnalysysAgent.profileSet(profiles)
  },
  profileSetOnce: function() {
    let setOnceProfiles = {
      "activationTime": "1521594686781",
      "loginTime": "1521594726781"
    }
    AnalysysAgent.profileSetOnce(setOnceProfiles)
  },
  profileIncrement: function() {
    let profies = {
      "age": 20,
      "integral": 200
    }
    AnalysysAgent.profileIncrement(profies)
  },
  profileAppend: function() {
    AnalysysAgent.profileAppend("Movies", "霸王别姬")
  },
  profileAppendObject: function() {
    let propertyObject = {
      'Movies': '霸王别姬',
      'Music': ['一无所有', '花房姑娘']
    }
    AnalysysAgent.profileAppend(propertyObject)
  },
  profileAppendArray: function() {
    let properties = ["海上钢琴师", "指环王"]
    AnalysysAgent.profileAppend("Movies", properties)
  },
  profileUnset: function() {
    AnalysysAgent.profileUnset("Movies")
  },
  profileDelete: function() {
    AnalysysAgent.profileDelete()
  },
  onLoad: function(o) {
    
  },
  prePage: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  nextPage:function(){
    wx.navigateTo({
      url: '../third/third'
    })
  },

  // 冒泡测试
  bubbling () {
    console.log('冒泡')
  },

  bubblingUp () {
    console.log('冒泡up')
  }
})