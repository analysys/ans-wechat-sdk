"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const app = Taro.getApp();

var AnalysysAgent = wx.AnalysysAgent;

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = [], _this.config = {
      navigationBarTitleText: '首页'
    }, _this.getPresetProperties = function () {
      AnalysysAgent.getPresetProperties();
    }, _this.onShareAppMessage = function () {
      // console.log("来到这里")
      var shareObj = {
        'path': "pages/index/index?id=33333",
        'title': "框架版分享标识"
      };
      var anshare = AnalysysAgent.share(shareObj);
      return anshare;
    }, _this.pageView = function () {
      var pageInfo = {
        "commodityName": "iPhone",
        "commodityPrice": 8000
      };
      AnalysysAgent.pageView("商品页", pageInfo);
    }, _this.alias = function () {
      AnalysysAgent.alias("sanban", "yiban");
    }, _this.identify = function () {
      AnalysysAgent.identify("userName");
    }, _this.reset = function () {
      AnalysysAgent.reset();
    }, _this.registerSuperProperty = function () {
      AnalysysAgent.registerSuperProperty("age", 20);
    }, _this.registerSuperProperties = function () {
      var superProperty = {
        "age": 20,
        "member": "VIP"
      };
      AnalysysAgent.registerSuperProperties(superProperty);
    }, _this.unRegisterSuperProperty = function () {
      AnalysysAgent.unRegisterSuperProperty("age");
    }, _this.clearSuperProperties = function () {
      AnalysysAgent.clearSuperProperties();
    }, _this.getSuperProperty = function () {
      AnalysysAgent.getSuperProperty("member");
    }, _this.getSuperProperties = function () {
      AnalysysAgent.getSuperProperties();
    }, _this.track = function () {
      var eventInfo = {
        "money": 2000
      };
      AnalysysAgent.track("payment", eventInfo);
    }, _this.profileSet = function () {
      var profiles = {
        "Email": "yonghu@163.com",
        "WeChatID": "微信号"
      };
      AnalysysAgent.profileSet(profiles);
    }, _this.profileSetOnce = function () {
      var setOnceProfiles = {
        "activationTime": "1521594686781",
        "loginTime": "1521594726781"
      };
      AnalysysAgent.profileSetOnce(setOnceProfiles);
    }, _this.profileIncrement = function () {
      var profies = {
        "age": 20,
        "integral": 200
      };
      AnalysysAgent.profileIncrement(profies);
    }, _this.profileAppend = function () {
      AnalysysAgent.profileAppend("Movies", "霸王别姬");
    }, _this.profileAppendObject = function () {
      var propertyObject = { 'Movies': '霸王别姬', 'Music': ['一无所有', '花房姑娘'] };
      AnalysysAgent.profileAppend(propertyObject);
    }, _this.profileAppendArray = function () {
      var properties = ["海上钢琴师", "指环王"];
      AnalysysAgent.profileAppend("Movies", properties);
    }, _this.profileUnset = function () {
      AnalysysAgent.profileUnset("Movies");
    }, _this.profileDelete = function () {
      AnalysysAgent.profileDelete();
    }, _this.nextPage = function () {
      wx.navigateTo({
        url: '../logs/logs'
      });
    }, _this.getDistinctId = function () {
      var DistinctId = AnalysysAgent.getDistinctId();
      // console.log(DistinctId)
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      AnalysysAgent.pageView('首页');
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["getPresetProperties", "nextPage", "pageView", "track", "alias", "identify", "reset", "registerSuperProperty", "registerSuperProperties", "unRegisterSuperProperty", "clearSuperProperties", "getSuperProperty", "getSuperProperties", "profileSet", "profileSetOnce", "profileIncrement", "profileAppend", "profileAppendObject", "profileAppendArray", "profileUnset", "profileDelete", "getDistinctId"], _class.$$componentPath = "pages/index/index", _temp2);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));