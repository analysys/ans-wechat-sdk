import baseConfig from '../baseConfig/index.js'
import Util from '../common/index.js'
import storage from '../storage/index.js'
import sessionId from './sessionId.js'
import ID from './id'
import { UTM, clearUTM } from './UTM'

let os = null;
let screenHeight = null;
let screenWidth = null;
let brand = null;
let browserVerson = null;
let osVerson = null;
let model = null;
let language = null;
let network = null;
// let source = null;

wx.onNetworkStatusChange(function (res) {
    //网络状态
    network = res.networkType
})

var base = baseConfig.base
function appkey (appkey) {
    base.appid = appkey
}
function getAppId () {
    return base.appid
}
function debugMode (debug) {
    base.$debug = debug
}
function getDebugMode () {
    return base.$debug
}
function getId () {
    return ID.getId()
}
function uploadURL (url) {
    if (url.charAt(url.length - 1) !== "/") {
        url += '/'
    }
    base.uploadURL = url
}
function getUploadURL (url) {
    if (base.uploadURL.charAt(base.uploadURL.length - 1) !== "/") {
        base.uploadURL += '/'
    }
    return base.uploadURL
}
function nowDate () {
    if (baseConfig.base.allowTimeCheck && baseConfig.base.logflag) {
        return +new Date() + (storage.getLocal("ANSSERVERTIME") ? Number(storage.getLocal("ANSSERVERTIME")) : 0)
    } else {
        return +new Date();
    }
}
function timeCalibration () {
    if (storage.getLocal("ANSSERVERTIME") && baseConfig.base.allowTimeCheck && baseConfig.base.logflag) {
        return true
    }
    return false
}
function getXwhat () {
    return baseConfig.status.FnName
}
function isLogin () {
    return (ID.getAliasId() || storage.getLocal('ARK_TRACK_LOGIN')) ? true : false
}

function getScreenWidth () {
    screenWidth = baseConfig.system.system.screenWidth || ""
    return screenWidth;
}
function getScreenHeight () {
    screenHeight = baseConfig.system.system.screenHeight || ""
    return screenHeight;
}
function getOs () {
    os = baseConfig.system.system.system.split(' ')[0] || "";
    return os;
}
function getBrand () {
    brand = baseConfig.system.system.brand || "";
    return brand;
}
function getBrowerVersion () {
    browserVerson = baseConfig.system.system.version || "";
    return browserVerson;
}
function getOsVersion () {
    osVerson = baseConfig.system.system.system.split(' ')[1] || "";
    return osVerson;
}
function getModel () {
    model = baseConfig.system.system.model || "";
    return model;
}
function getLanguage () {
    language = baseConfig.system.system.language || "";
    return language;
}
function getNetWork () {
    network = baseConfig.system.netWork.networkType;
    return network;
}

function getRefferer () {
    // 获取 栈内上一页面 url 当前页面和launch 页面url比对，相等说明在 起始页面。不等才可以用到 lenngth.route 以免报错 
    let pages = getCurrentPages();
    // pages > 0 ;说明有上一页面的浏览，所以refferer是上一页面的url 
    if (pages.length > 1) {
        let prevPage = pages[pages.length - 2].route;
        return prevPage
    }
    return getScene();
}

function getScene () {
    if (baseConfig.system.scene) {
        return baseConfig.system.scene.scene.toString();
    } else {
        return "";
    }
}

var time_zone = 'GMT' + Util.clientTimeZone();

function getSessionId () {
    return sessionId.getId()
}
function is_first_time () {
    var timeStatus = storage.getLocal("FRISTIME")
    storage.setLocal("FRISTIME", false)
    if (timeStatus == undefined) {
        return true;
    }
    return timeStatus
}
function is_first_day () {
    var date = new Date();
    // 假如 进行了时间校准 此时的date 应该是校准过的时间
    if (baseConfig.base.allowTimeCheck && baseConfig.base.logflag) {
        date = new Date(+new Date() + (storage.getLocal("ANSSERVERTIME") ? Number(storage.getLocal("ANSSERVERTIME")) : 0))
    }
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    var day = date.getDate()
    day = day < 10 ? '0' + day : day
    var todayDate = year + '' + month + '' + day
    var storageDay = storage.getLocal("FRISTDAY")
    if (storageDay && todayDate !== storageDay) {
        return false
    }
    storage.setLocal("FRISTDAY", todayDate)
    return true
}
function first_visit_time () {
    let time = Util.format(new Date(), 'yyyy-MM-dd hh:mm:ss.SSS');
    if (baseConfig.base.allowTimeCheck && baseConfig.base.logflag) {
        time = Util.format(new Date(+new Date() + (storage.getLocal("ANSSERVERTIME") ? Number(storage.getLocal("ANSSERVERTIME")) : 0)), 'yyyy-MM-dd hh:mm:ss.SSS');
    }
    if (storage.getLocal('ARKFRISTPROFILE')) {
        time = storage.getLocal('ARKFRISTPROFILE');
    }
    return time;
}
function getoriginal_id () {
    return ID.getTrackId() || ID.jsId()

}
function getUrl () {
    const pages = getCurrentPages()
    if (pages.length > 0) {
        const currentPage = pages[pages.length - 1]
        const url = `/${currentPage.route}`
        return url
    }
    return ""
}
function getLibVersion () {
    return base.$lib_version
}


// UTM 相关 UTM有更改 sessionId 要变更
let old_UTM = storage.getData("UTMSESSION") || "";
if (UTM["utm_campaign"] && UTM["utm_source"] && UTM["utm_medium"]) {
    if (old_UTM !== JSON.stringify(UTM)) {
        sessionId.setId()
    }
    storage.setData('UTMSESSION', JSON.stringify(UTM))
} else {
    clearUTM()
    storage.removeData('UTMSESSION')
}
function utm_campaign_id () {
    return UTM["utm_campaign_id"]
}
function utm_source () {
    return UTM["utm_source"]
}
function utm_medium () {
    return UTM["utm_medium"]
}
function utm_term () {
    return UTM["utm_term"]
}
function utm_content () {
    return UTM["utm_content"]
}
function utm_campaign () {
    return UTM["utm_campaign"]
}

// 分享相关信息
function share_level () {
    return baseConfig.base.$share_level;
}
function share_path () {
    return baseConfig.base.$share_path;
}
function share_id () {
    return baseConfig.base.$share_id
}


export {
    getAppId,
    getId,
    getUploadURL,
    getScreenWidth,
    getScreenHeight,
    getNetWork,
    // appkey,
    // debugMode,
    // uploadURL,
    getRefferer,
    getDebugMode,
    nowDate,
    getXwhat,
    isLogin,
    time_zone,
    getOs,
    getBrand,
    getBrowerVersion,
    getOsVersion,
    getModel,
    getLanguage,
    getSessionId,
    is_first_time,
    is_first_day,
    first_visit_time,
    getoriginal_id,
    getUrl,
    getLibVersion,
    timeCalibration,
    getScene,
    utm_campaign_id,
    utm_source,
    utm_medium,
    utm_term,
    utm_content,
    utm_campaign,
    share_level,
    share_path,
    share_id
}