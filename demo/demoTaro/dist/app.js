'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

var _AnalysysAgent_WX_SDKCustomMin = require('./sdk/AnalysysAgent_WX_SDK.custom.min.js');

var _AnalysysAgent_WX_SDKCustomMin2 = _interopRequireDefault(_AnalysysAgent_WX_SDKCustomMin);

var _AnalysysAgent_encryptionMin = require('./sdk/AnalysysAgent_encryption.min.js');

var AnalysysEncryption = _interopRequireWildcard(_AnalysysAgent_encryptionMin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// taro 不能引入 es6 不支持。
_AnalysysAgent_WX_SDKCustomMin2.default.encrypt = AnalysysEncryption; //加密模块的方法赋值给，方便调用。


_AnalysysAgent_WX_SDKCustomMin2.default.debugMode = 2;
_AnalysysAgent_WX_SDKCustomMin2.default.appkey = 'sdktest201';
_AnalysysAgent_WX_SDKCustomMin2.default.uploadURL = 'https://arkpaastest.analysys.cn:4089';
_AnalysysAgent_WX_SDKCustomMin2.default.encryptType = 2;
_AnalysysAgent_WX_SDKCustomMin2.default.autoShare = true;
_AnalysysAgent_WX_SDKCustomMin2.default.allowTimeCheck = true;
_AnalysysAgent_WX_SDKCustomMin2.default.maxDiffTimeInterval = 1;

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _App.__proto__ || Object.getPrototypeOf(_App)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/index/index', 'pages/logs/logs', 'pages/third/third'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
        // globalData = {
        //     AnalysysAgent: AnalysysAgent
        // }
      } }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // AnalysysAgent.alias("1")
      _AnalysysAgent_WX_SDKCustomMin2.default.registerSuperProperty("age", 20);
      _AnalysysAgent_WX_SDKCustomMin2.default.pageView('2222', { a: 1 });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _AnalysysAgent_WX_SDKCustomMin2.default.identify("identy111111122", false);
    }
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {
      var params = this.$router.params;
      _AnalysysAgent_WX_SDKCustomMin2.default.appStart(params);
    }
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {}
  }, {
    key: 'componentDidCatchError',
    value: function componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: '_createData',
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});