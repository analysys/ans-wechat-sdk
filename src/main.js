import baseConfig from './lib/baseConfig/index';
import Util from './lib/common/index';
import { errorLog, successLog } from './lib/printLog/index';
import { resetCode } from './lib/fillFiled/index';
import { API } from './API/index';

import { UTM } from './lib/fillFiled/UTM'
import PublicApp from './lib/common/publicApp.js'
let setPublicApp = PublicApp.setPublicApp


class Ark_PASS_SDK extends API {
    constructor() {
        super()
    }
    set appkey (key) {
        resetCode();
        baseConfig.status.FnName = "appkey";
        baseConfig.status.successCode = "20002";
        baseConfig.status.value = key;
        successLog();
        baseConfig.status.successCode = "20007";
        baseConfig.status.value = baseConfig.base.$lib_version;
        successLog();
        baseConfig.base.appid = key;
    }
    get appkey () {
        return baseConfig.base.appid;
    }
    set debugMode (debug) {
        resetCode();
        baseConfig.base.$debug = debug;
    }
    get debugMode () {
        return baseConfig.base.$debug;
    }
    set auto (AUTO) {
        resetCode();
        if (Util.paramType(AUTO) !== 'Boolean') {
            baseConfig.status.key = "auto";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = AUTO;
            errorLog();
            return;
        }
        baseConfig.base.auto = AUTO;
    }
    get auto () {
        return baseConfig.base.auto;
    }
    set uploadURL (ServerUrl) {
        resetCode();
        if (!ServerUrl) {
            baseConfig.status.errorCode = "60007";
            errorLog();
            return;
        }
        if (!Util.checkURL(ServerUrl)) {
            baseConfig.status.errorCode = "600011";
            baseConfig.status.key = "uploadURL";
            baseConfig.status.value = ServerUrl;
            errorLog()
            return;
        };
        if (ServerUrl.charAt(ServerUrl.length - 1) !== '/') {
            ServerUrl += '/';
        };
        baseConfig.base.uploadURL = ServerUrl + 'up';
        baseConfig.status.successCode = "20008";
        baseConfig.status.value = ServerUrl;
        successLog();
    }
    get uploadURL () {
        return baseConfig.base.uploadURL;
    }
    set autoProfile (autoPro) {
        resetCode();
        if (Util.paramType(autoPro) !== 'Boolean') {
            baseConfig.status.key = "autoProfile";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = autoPro;
            errorLog();
            return;
        }
        baseConfig.base.autoProfile = autoPro;
    }
    get autoProfile () {
        return baseConfig.base.autoProfile;
    }
    set encryptType (encryptType) {
        resetCode();
        if (Util.paramType(encryptType) !== "Number") {
            baseConfig.status.key = "encryptType";
            baseConfig.status.errorCode = "60002";
            baseConfig.status.value = encryptType;
            errorLog();
            return;
        }
        baseConfig.base.encryptType = encryptType;
    }
    get encryptType () {
        return baseConfig.base.encryptType;
    }
    set autoShare (shareStatus) {
        resetCode();
        if (Util.paramType(shareStatus) !== "Boolean") {
            baseConfig.status.key = "autoShare";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = shareStatus;
            errorLog();
            return;
        }
        baseConfig.base.autoShare = shareStatus;
    }
    get autoShare () {
        return baseConfig.base.autoShare;
    }
    set allowTimeCheck (Flag) {
        resetCode();
        if (Util.paramType(Flag) !== "Boolean") {
            baseConfig.status.key = "allowTimeCheck";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = Flag;
            errorLog();
            return;
        }
        baseConfig.base.allowTimeCheck = Flag;
    }
    get allowTimeCheck () {
        return baseConfig.base.allowTimeCheck;
    }
    set maxDiffTimeInterval (time) {
        resetCode();
        if (Util.paramType(time) !== "Number") {
            baseConfig.status.key = "maxDiffTimeInterval";
            baseConfig.status.errorCode = "60002";
            baseConfig.status.value = time;
            errorLog();
            return;
        }
        baseConfig.base.maxDiffTimeInterval = time;
    }
    get allowTimeCheck () {
        return baseConfig.base.maxDiffTimeInterval;
    }
}

// 原有生命周周期的封装 ，不能影响小程序原有生命周期
function appFn (obj, Fn, toFn) {
    if (obj[Fn]) {
        let oldFn = obj[Fn];
        if (Fn === "onShareAppMessage") {
            obj[Fn] = function (t) {
                // return toFn(oldFn());
                return toFn(oldFn.call(this, t));
            }
        } else {
            obj[Fn] = function (t) {
                toFn(t);
                // oldFn(t)
                oldFn.call(this, t)
            }
        }
    } else {
        if (Fn !== "onShareAppMessage") {
            obj[Fn] = function (t) {
                toFn(t);
            }
        }
    }
}

let ark_sdk = new Ark_PASS_SDK();
wx.AnalysysAgent = ark_sdk;

// AnalysysAgent 对象的添加。  App 为小程序的原生方法 注册小程序使用 全局只有一个; 
// App 赋值为 APP ， 而在小程序的app.js 中会对 App方法进行调用，之后我们再把原有的App（赋值为APP）调用一遍；
let APP = App;
App = function (app) {
    // UTM 放在onshow ,保证小程序未被杀死，参数更改情况下重新获取。
    appFn(app, 'onShow', function setOptions (options) {
        let option = options
        if (options && options._status == "create") {
            setPublicApp(options)
            option = options.options
        }
        // 存在参数的 utm 赋值
        if (option.query && Object.keys(option.query).length > 0) {
            if (option.query.utm_campaign && option.query.utm_medium && option.query.utm_source) {
                UTM.utm_campaign_id = option.query.campaign_id;
                UTM.utm_campaign = option.query.utm_campaign;
                UTM.utm_content = option.query.utm_content;
                UTM.utm_medium = option.query.utm_medium;
                UTM.utm_source = option.query.utm_source;
                UTM.utm_term = option.query.utm_term;
            }
            // 关于分享的赋值引用
            if (option.query.share_id && option.query.share_level && option.query.share_path) {
                baseConfig.base.$share_id = option.query.share_id;
                baseConfig.base.$share_level = option.query.share_level;
                baseConfig.base.$share_path = decodeURIComponent(option.query.share_path);
            }
        }
        // 更新场景值，从分享进去等操作。
        if (option.scene) {
            baseConfig.system.scene = options.scene;
        }
    })
    APP(app);
};
// 
let PAGE = Page;
Page = function (page) {
    appFn(page, 'onShow', ark_sdk.startUp)
    if (baseConfig.base.autoShare == true) {
        appFn(page, 'onShareAppMessage', ark_sdk.share);
    }
    PAGE(page);
};

export default ark_sdk