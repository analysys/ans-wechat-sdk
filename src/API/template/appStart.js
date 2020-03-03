import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import storage from '../../lib/storage/index'
import sessionId from '../../lib/fillFiled/sessionId'
import id from '../../lib/fillFiled/id'
import {
    temp
} from '../../lib/mergeRules/index'
import {
    fillField
} from '../../lib/fillFiled/index'
import {
    resetCode
} from '../../lib/fillFiled/index'
import {
    sendData
} from '../../lib/upload/index'
import {
    setFirstProfile
} from './setFirstProfile'
import {
    UTM
} from '../../lib/fillFiled/UTM'

import PublicApp from '../../lib/common/publicApp.js'
let setPublicApp = PublicApp.setPublicApp


function appStart(options) {
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

    baseConfig.isStartUp = true;
    baseConfig.status.FnName = '$startup'
    resetCode()
    let appid = storage.getLocal('ARKAPPID');
    let debug = storage.getLocal('ARKDEBUG');
    let uploadUrl = storage.getLocal('ARKUPLOADURL');
    if (appid !== baseConfig.base.appid || (debug === 1 && debug !== baseConfig.base.$debug) || uploadUrl !== baseConfig.base.uploadURL) {
        // 数据变化
        Util.delFristDay()
        Util.delFristTime();
        if (appid != undefined) {
            id.removeTrackId();
            storage.removeLocal('ARKSUPER');
            storage.removeLocal("ARKFRISTPROFILE"); //变更之后重新清除 ARKFRISTPROFILE。不然profile_set_once 不会上传
            storage.removeLocal("ARKFRISTPROFILESEND"); //这是发送的标志            
        }
        id.removeLoginId()
        storage.setData("STARTUP", true)
        storage.removeData("STARTUPTIME");
        storage.removeData("ARK_TRACK_LOGIN")
        if (!baseConfig.base.allowTimeCheck) {
            storage.removeLocal("ANSSERVERTIME")
        }
        storage.removeLocal("POSTDATA"); //变更 删除缓存数据 
        Util.setFristDay();
        Util.setFristTime()
    }
    storage.setLocal('ARKAPPID', baseConfig.base.appid);
    storage.setLocal('ARKDEBUG', baseConfig.base.$debug)
    storage.setLocal('ARKUPLOADURL', baseConfig.base.uploadURL)

    let isStartUp = storage.getData("STARTUP") !== false ? true : false;
    if (!isStartUp) {
        return;
    };
    sessionId.setId(); //设置sessionID 和 sessionDate
    storage.setData("STARTUP", false);

    // 上传字段表 更改为 Promise ，保证拿到设备信息和 网络状态 
    let startUpTemp = temp('$startup');
    let res = fillField(startUpTemp);
    res = Util.delEmpty(res);
    // res 为stratUp的组装数据,把此时的 xwhen 存储下来(假如开启时间校准，xwhen是校准过的时间)，作为 first_visit_time;
    if (!storage.getLocal('ARKFRISTPROFILE')) {
        storage.setLocal('ARKFRISTPROFILE', Util.format(new Date(res.xwhen), 'yyyy-MM-dd hh:mm:ss.SSS'));
    }
    // 跑一遍FnSuperCatch，保证startup 之前的操作的超级属性，跟随startup 上报。
    let FnSuperCatch = baseConfig.FnSuperCatch;
    for (var i = 0; i < FnSuperCatch.length; i++) {
        // wx.AnalysysAgent[FnCatch[i][0]].call(wx.AnalysysAgent[FnCatch[i][0]], ...FnCatch[i][1]);
        FnSuperCatch[i][0].apply(FnSuperCatch[i][0], FnSuperCatch[i][1]);
    };
    baseConfig.FnSuperCatch = [];
    //其中 pageview  track  startup要合并超级属性 
    let arkSuper = storage.getLocal("ARKSUPER") || {};
    res.xcontext = Util.objMerge(res.xcontext, arkSuper);
    let appProperty = baseConfig.base.appProperty || {};
    res.xcontext = Util.objMerge(res.xcontext, appProperty)
    storage.setData("STARTUPTIME", Util.format(new Date(res.xwhen), 'yyyy-MM-dd hh:mm:ss.SSS'));
    if (baseConfig.base.autoProfile != true) {
        sendData(Util.delEmpty(res));
        return;
    }
    // 存储到 POSTDATA; 假如采集首次属性 一起发，没有就在发送。此时的res 需要变成数组 存进 POSTDATA;
    let ARKPOST = storage.getLocal("POSTDATA") || [];
    ARKPOST = [...ARKPOST, ...Util.objInArray(res)]
    storage.setLocal("POSTDATA", ARKPOST);
    // 来到这里说明 用profilesetOnce 上传  ，框架版sdk 没有 ;
    setFirstProfile("appStart");

    let FnCatch = baseConfig.FnCatch;
    for (var i = 0; i < FnCatch.length; i++) {
        // wx.AnalysysAgent[FnCatch[i][0]].call(wx.AnalysysAgent[FnCatch[i][0]], ...FnCatch[i][1]);
        FnCatch[i][0].apply(FnCatch[i][0], FnCatch[i][1]);
    }
    baseConfig.FnCatch = [];
}

export {
    appStart
}