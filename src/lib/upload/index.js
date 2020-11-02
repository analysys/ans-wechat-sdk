import Util from "../common/index";
import baseConfig from "../baseConfig/index"
import { errorLog, successLog } from '../printLog/index'
import { resetCode } from '../fillFiled/index';
import storage from "../storage/index";
import PublicApp from '../common/publicApp.js'
let publicApp = PublicApp.getPublicApp
let request = PublicApp.Fetch.request
var postStatus = true;

function checkLogBaseJson (obj) {
    if (Util.paramType(obj) === 'Object' && !Util.isEmptyObject(obj)) {
        var status = true
        for (var i = 0; i < baseConfig.baseJson.length; i++) {
            var key = baseConfig.baseJson[i]
            if (key === 'xwhat') {
                continue
            }
            if (!obj[key] || (Util.paramType(obj[key]) == 'Object' && Util.isEmptyObject(obj[key]))) {
                status = false
            }
        }
        return status
    }
    return false
}

function sendData (data) {
    if (baseConfig.base.appid === "") {
        baseConfig.status.errorCode = "60006";
        errorLog();
        return
    }
    if (baseConfig.base.uploadURL === "") {
        baseConfig.status.errorCode = "60007";
        errorLog();
        return
    }
    let postDataList = storage.getLocal("POSTDATA") || []
    let saveData = [];
    if (postDataList.length > 0) {
        for (let i = 0; i < postDataList.length; i++) {
            if (Util.paramType(postDataList[i]) === 'Array') {
                saveData.push.apply(saveData, postDataList[i])
            } else {
                if (Util.paramType(postDataList[i]) === "Object" && checkLogBaseJson(postDataList[i])) {
                    // 校验数据的合法性  是否为Object
                    saveData.push(postDataList[i])
                }
            }
        }
    }
    // 缓存 条数 超过500，不再存储
    if (postDataList.length <= 500 && Object.keys(data).length > 0) {
        saveData.push(data)
    };
    storage.setLocal("POSTDATA", saveData)
    if (postStatus === true) {
        sendPost(saveData)
    }
}

function sendPost (upData) {
    // storage.removeLocal("POSTDATA")
    resetCode();
    postStatus = false;
    let originUpData = upData;
    let option = {
        url: baseConfig.base.uploadURL + '?appid=' + baseConfig.base.appid,
        data: upData,
        encryptType: baseConfig.base.encryptType
    }
    // 过滤方法  假如有加密 将返回 加密后的 url 及 upData;
    if (publicApp().AnalysysAgent.encrypt && Util.paramType(publicApp().AnalysysAgent.encrypt.uploadData) == "Function") {
        option = publicApp().AnalysysAgent.encrypt.uploadData(option);
    }
    // 打印上传 数据 Data,打印上报 地址 uploadUrl
    baseConfig.status.key = option.url;
    baseConfig.status.value = JSON.stringify(upData);
    baseConfig.status.successCode = "20012";
    successLog();
    wx.AnalysysModal && wx.AnalysysModal(upData)
    request({
        url: option.url,
        method: 'POST',
        data: JSON.stringify(option.data),
        dataType: "json",
        success: function (res) {
            postStatus = true;
            // 时间校准 服务端时间和 前端时间的差值。（不再每次校验更改差值，全部用 allowTimeCheck 返回的值确定 ）
            // if (res.header && res.header.Date) {
            //     let time = +new Date()
            //     let date = res.header.Date
            //     if (date) {
            //         storage.setLocal('ANSSERVERTIME', +new Date(date) - time)
            //     }
            // };
            // 判断是不是加密的，根据字符串判断，（假如解密会是包增大）
            if (Util.paramType(res.data) == "String") {
                if (publicApp().AnalysysAgent.encrypt && Util.paramType(publicApp().AnalysysAgent.encrypt.decodeRes) == "Function") {
                    res.data = JSON.parse(publicApp().AnalysysAgent.encrypt.decodeRes(res.data));
                } else if (res.data == "H4sIAAAAAAAAAKtWSs5PSVWyMjIwqAUAVAOW6gwAAAA=") {
                    res.data = {
                        "code": 200
                    }
                } else if (res.data == "H4sIAAAAAAAAAKtWSs5PSVWyMjUwqAUA7TtBdwwAAAA=") {
                    res.data = {
                        "code": 500
                    }
                } else if (res.data == "H4sIAAAAAAAAAKtWSs5PSVWyMjEy0FHKLU5XslJySSxJVHBJTS6qLChRcC0qyi/S01OqBQBdATGSKQAAAA==") {
                    res.data = {
                        "code": 420
                    }
                } else {
                    res.data = {
                        "code": 200
                    }
                }
            }
            // 200 上报成功 删除数据，500，上报失败，删除数据。
            if (res.data.code == 200 || res.data.code == 500 || res.data.code == 420) {
                let nowLocalData = storage.getLocal('POSTDATA') || [];
                // 删除重复的数据
                let diffData = dataDiff(nowLocalData, originUpData);
                if (res.data.code == 200) {
                    baseConfig.status.successCode = '20001'
                    successLog()
                } else {
                    baseConfig.status.errorCode = '60008'
                    errorLog()
                }
                storage.removeLocal("POSTDATA");
                if (diffData.length > 0) {
                    storage.setLocal("POSTDATA", diffData)
                    sendPost(diffData)
                }
            } else {
                baseConfig.status.errorCode = '60008'
                errorLog()
                // 是否单加一个 你需要升级 方舟服务端。
                // let newLocal = storage.getLocal('POSTDATA') || []
                // let newSaveData = [...originUpData, ...newLocal]
                // storage.setLocal('POSTDATA', newSaveData)
                // if (newLocal.length > 0) {
                //     sendPost(newSaveData)
                // }
            }
        },
        fail: function () {
            postStatus = true;
            baseConfig.status.errorCode = "60008";
            errorLog();
            // let newLocal = storage.getLocal("POSTDATA") || [];
            // let newSaveData = [...originUpData, ...newLocal];
            // storage.setLocal("POSTDATA", newSaveData);
            // if (newLocal.length > 0) {
            //     sendPost(newSaveData);
            // }
        }
    })
}

function dataDiff (arr1, arr2) {
    let length1 = arr1.length;
    let length2 = arr2.length;
    if (length1 > 0) {
        for (let i = 0; i < length1; i++) {
            for (let j = 0; j < length2; j++) {
                if (arr1[i].xwhat == arr2[j].xwhat && arr1[i].xwhen == arr2[j].xwhen) {
                    arr1.splice(i, 1);
                    dataDiff(arr1, arr2)
                    return arr1
                }
            }
        }
    }
    return arr1;
}

export {
    sendPost,
    sendData
}