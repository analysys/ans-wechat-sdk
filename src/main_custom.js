import baseConfig from './lib/baseConfig/index';
import Util from './lib/common/index';
import { errorLog, successLog } from './lib/printLog/index';
import { resetCode } from './lib/fillFiled/index';
import { API } from './API/index';

import PublicApp from './lib/common/publicApp.js'
let getPublicApp = PublicApp.getPublicApp

baseConfig.isStartUp = true;
baseConfig.base.auto = false;

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
}


let ark_sdk = new Ark_PASS_SDK();
delete ark_sdk.startUp;

let publicApp = getPublicApp()
if (publicApp) {
    publicApp.AnalysysAgent = ark_sdk;
}
export default ark_sdk