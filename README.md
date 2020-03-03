# [易观方舟](https://www.analysys.cn/) ans-wechat-sdk [![NPM version][npm-image]][npm-url] [![License](https://img.shields.io/github/license/analysys/ans-wechat-sdk.svg)](https://github.com/analysys/ans-wechat-sdk/blob/master/LICENSE) [![GitHub release](https://img.shields.io/github/release/analysys/ans-wechat-sdk.svg)](https://github.com/analysys/ans-wechat-sdk/releases)

## 安装

    $ npm install ans-wechat-sdk --save


## wechat SDK 基础说明
+ 快速集成

      // 非es6 
      var AnalysysAgent = require("ans-wechat-sdk");
      // 小程序提供了加密模块 根据自己需要引入
      var AnalysysEncryption = require('ans-wechat-sdk/sdk/AnalysysAgent_encryption.min.js');
      // sdk 与 加密模块关联
      AnalysysAgent.encrypt = AnalysysEncryption;

      // es6 
      import AnalysysAgent from "ans-wechat-sdk"
      import AnalysysEncryption  from 'ans-wechat-sdk/sdk/AnalysysAgent_encryption.min.js';
      AnalysysAgent.encrypt = AnalysysEncryption;


      // wechat SDK 初始化
      AnalysysAgent.appkey = "/*设置为实际APPKEY*/" 
      AnalysysAgent.uploadURL = "/*设置为实际地址*/"
      AnalysysAgent.debugMode = 1
      AnalysysAgent.autoProfile = false
      AnalysysAgent.encryptType = 1
      AnalysysAgent.allowTimeCheck = true
      AnalysysAgent.maxDiffTimeInterval = 20 

    
+ appkey(必须) 在网站获取的 AppKey
+ debugMode 设置调试模式：0 - 关闭调试模式(默认)；1 - 开启调试模式，数据不入库；2 - 开启调试模式，数据入库
+ uploadURL(必须) 自定义上传地址
+ autoProfile 设置是否追踪新用户的首次属性：false - 不追踪新用户的首次属性；true - 追踪新用户的首次属性(默认)
+ encryptType 设置是否对上传数据加密：0 - 对上传数据不加密(默认)；1 - 对上传数据进行AES 128位ECB加密；2 对上传数据进行AES 128位CBC加密
+ allowTimeCheck 设置是否开启时间校准：false(默认) - 关闭时间校准；true - 开启时间校准
+ maxDiffTimeInterval 设置最大时间校准分为：30s(默认) ，当设置的时间差值小于他，将不开启校准。否则将会进行时间校准。假如设置成为负值，将默认为 30s。

>微信小程序要手动上报启动事件。

    App({
        onShow : function( options ){
            //设置微信小程序启动事件,并传输UTM等参数
            AnalysysAgent.appStart(options)
        }
    });

    // 注，各个页面调用API 要加上这个定义，直接引用
    let AnalysysAgent = wx.AnalysysAgent

> 通过以上步骤您即可验证SDK是否已经集成成功，更多Api使用方法参考：[易观方舟 wechat SDK 文档](https://docs.analysys.cn/ark/integration/sdk/wx/wxsdkcustom)

> 注意 SDK 可能不完全向前兼容，请查看版本更新说明 [Release及版本升级记录](https://github.com/analysys/ans-wechat-sdk/releases)。如果有说明不兼容的话，需要升级易观方舟对应的版本。 请根据需要前往 [Release](https://github.com/analysys/ans-wechat-sdk/releases) 里下载对应的文件

> npm 安装适用于框架版小程序，基础版和插件版原生开发的小程序使用详见：[易观方舟 wechat SDK 文档](https://docs.analysys.cn/ark/integration/sdk/wx)

## 版本升级记录
请参见 [Release及版本升级记录](https://github.com/analysys/ans-wechat-sdk/releases)


         

## 讨论
+ 微信号：nlfxwz
+ 钉钉群：30099866
+ 邮箱：nielifeng@analysys.com.cn


**禁止一切基于易观方舟 wechat 开源 SDK 的所有商业活动！**

---

[![NPM downloads][npm-downloads]][npm-url]




[homepage]: https://github.com/analysys/ans-wechat-sdk
[npm-url]: https://www.npmjs.com/package/ans-wechat-sdk
[npm-image]: https://img.shields.io/npm/v/ans-wechat-sdk.svg?style=flat
[npm-downloads]: https://img.shields.io/npm/dm/ans-wechat-sdk.svg?style=flat
[npm-downloads]: http://img.shields.io/npm/dm/sa-sdk-node.svg?style=flat

