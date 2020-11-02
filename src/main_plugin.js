import baseConfig from './lib/baseConfig/index';
import Util from './lib/common/index';
import { errorLog, successLog } from './lib/printLog/index';
import { resetCode } from './lib/fillFiled/index';
import { API } from './API/index';
import { share } from './API/template/share'
import { userClick } from './API/template/userClick'
import { userClickPage } from './API/template/userClickPage'

import { UTM } from './lib/fillFiled/UTM'
import PublicApp from './lib/common/publicApp.js'
let setPublicApp = PublicApp.setPublicApp

let arkApp = App;
let arkPage = Page;
let arkComponent = Component
let hookListNot = ["data", "onLoad", "onShow", "onReady", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll", "onResize", "onTabItemTap", "onHide", "onUnload"]

class Ark_PASS_SDK extends API {
    constructor() {
        super()
    }
    set appkey (key) {
        resetCode();
        if (Util.paramType(key) !== 'String') {
            baseConfig.status.FnName = "appkey";
            baseConfig.status.errorCode = "60001";
            baseConfig.status.key = key;
            errorLog();
            return;
        }
        if (key == "") {
            baseConfig.status.FnName = "appkey";
            baseConfig.status.errorCode = "60006";
            errorLog();
            return;
        }
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
    get maxDiffTimeInterval () {
        return baseConfig.base.maxDiffTimeInterval;
    }
    set autoTrack (autoTrackStatus) {
        resetCode();
        if (Util.paramType(autoTrackStatus) !== "Boolean") {
            baseConfig.status.key = "autoTrack";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = autoTrackStatus;
            errorLog();
            return;
        }
        baseConfig.base.autoTrack = autoTrackStatus;
    }
    get autoTrack () {
        return baseConfig.base.autoTrack;
    }
    set autoCompleteURL (autoCompleteURLStatus) {
        resetCode();
        if (Util.paramType(autoCompleteURLStatus) !== "Boolean") {
            baseConfig.status.key = "autoCompleteURL";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = autoCompleteURLStatus;
            errorLog();
            return;
        }
        baseConfig.base.autoCompleteURL = autoCompleteURLStatus;
    }
    get autoCompleteURL () {
        return baseConfig.base.autoCompleteURL
    }
    App (app) {
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
        arkApp(app)
    }

    // 小程序的初始 onLunch 更改在 类里面；
    Page (page) {
        hookMethods(page)
        arkPage(page);
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
                var b = oldFn.apply(this, arguments);
                toFn(t, Fn);
                return b;
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

function hookMethods (methods) {
    appFn(methods, 'onShow', ark_sdk.startUp)
    if (baseConfig.base.autoShare == true) {
        appFn(methods, 'onShareAppMessage', ark_sdk.share);
    }
    if (baseConfig.base.autoTrack == true) {
        for (var i in methods) {
            if (Util.paramType(methods[i]) == "Function" && hookListNot.indexOf(i) < 0) {
                appFn(methods, i, userClick);
            }
            if (Util.paramType(methods[i]) == "Function" && i == "onTabItemTap") {
                appFn(methods, i, userClickPage);
            }
        }
    }
}

Component = function (component) {
    if (component.methods) {
        hookMethods(component.methods)
    }
    arkComponent(component)
}

let ark_sdk = new Ark_PASS_SDK();
wx.AnalysysAgent = ark_sdk;

// 微信小程序插件版本，区别于其他小程序的版本，当小程序使用插件，小程序原有App 和 Page 方法 是不能被改写的，
// 改写会提醒报错，不能重新定义，所以普通版本的，不再适用。


export default ark_sdk