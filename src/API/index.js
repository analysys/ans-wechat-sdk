import { startUp } from './template/startUp';
import { pageView } from './template/pageView';
import { registerSuperProperty } from './template/registerSuperProperty';
import { unRegisterSuperProperty } from './template/unRegisterSuperProperty';
import { registerSuperProperties } from './template/registerSuperProperties';
import { getSuperProperty } from './template/getSuperProperty';
import { getSuperProperties } from './template/getSuperProperties';
import { clearSuperProperties } from './template/clearSuperProperties';
import { alias } from './template/alias';
import { track } from './template/track';
import { identify } from './template/identify';
import { reset } from './template/reset';
import { profileSet } from './template/profileSet';
import { profileSetOnce } from './template/profileSetOnce';
import { profileIncrement } from './template/profileIncrement';
import { profileAppend } from './template/profileAppend';
import { profileUnset } from './template/profileUnset';
import { profileDelete } from './template/profileDelete';
import { share } from './template/share'
import { appProperty } from "./template/appProperty";
import { getDistinctId } from './template/getDistinctId';
import { getPresetProperties } from './template/getPresetProperties';
import { pageProperty } from './template/pageProperty'
import baseConfig from '../lib/baseConfig';
import { checkTimePromise } from '../lib/checkTime/checkTimePromise'

import PublicApp from '../lib/common/publicApp.js'
import storage from '../lib/storage';
let systemPromise = PublicApp.System.systemPromise
let netWorkPromise = PublicApp.Network.netWorkPromise
let customFlag = true
let startUpFnCache = []
function initFn (callback, isS, superFlag) {
    return function () {
        if (customFlag == true && (Object.keys(baseConfig.system.system).length === 0 || Object.keys(baseConfig.system.netWork).length === 0)) {
            customFlag == false;
            Promise.all([systemPromise(), netWorkPromise(), checkTimePromise(), storage.initLocalData()]).then((res) => {
                customFlag = true
                // 第一个 系统信息，第二个 网络信息  第三个 场景值。  赋值给公共变量 baseConfig ，之后 getField 获取公共变量。
                baseConfig.system.system = res[0];
                baseConfig.system.netWork = res[1];
                if (startUpFnCache.length > 0) {
                    startUpFnCache[0][0](startUpFnCache[0][1])
                    startUpFnCache = []
                }
                if (superFlag && baseConfig.isStartUp != true) {
                    baseConfig.FnSuperCatch.push([callback, arguments])
                } else if (isS || baseConfig.isStartUp == true) {
                    callback.apply(callback, arguments)
                } else {
                    baseConfig.FnCatch.push([callback, arguments])
                }
            }).catch((e) => { })
        } else {
            if ((isS || baseConfig.isStartUp == true) && customFlag == true) {
                callback.apply(callback, arguments)
            } else if (superFlag == true) {
                baseConfig.FnSuperCatch.push([callback, arguments])
            } else if (customFlag == true && superFlag === false) {
                startUpFnCache.push([callback, arguments])
            } else {
                baseConfig.FnCatch.push([callback, arguments])
            }
        }
    }
}

// 所有API 先缓存队列 ，因为首次启动 APPID 不一样会清除  POSTDATA 队列。导致 startup 之前缓存的 POSTDATA 丢失，导致丢数。
class API {
    constructor() {
        this.appStart = initFn(startUp, true, false);
        this.startUp = initFn(startUp, true);
        this.pageView = initFn(pageView, false);
        this.registerSuperProperty = initFn(registerSuperProperty, false, true);
        this.unRegisterSuperProperty = initFn(unRegisterSuperProperty, false, true);
        this.registerSuperProperties = initFn(registerSuperProperties, false, true);
        this.getSuperProperty = getSuperProperty;
        this.getSuperProperties = getSuperProperties;
        this.clearSuperProperties = initFn(clearSuperProperties, false, true);
        this.alias = initFn(alias, true);
        this.track = initFn(track, false);
        this.identify = initFn(identify, false, true);
        this.reset = reset;
        this.profileSet = initFn(profileSet, false);
        this.profileSetOnce = initFn(profileSetOnce, false);
        this.profileIncrement = initFn(profileIncrement, false);
        this.profileAppend = initFn(profileAppend, false);
        this.profileUnset = initFn(profileUnset, false);
        this.profileDelete = initFn(profileDelete, false);
        this.share = share;
        this.appProperty = appProperty;
        this.getDistinctId = getDistinctId;
        this.getPresetProperties = getPresetProperties;
        this.pageProperty = pageProperty;
    }
}
export { API }