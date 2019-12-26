import Util from '../common/index.js'
import baseConfig from '../baseConfig/index.js'
import { errorLog } from '../printLog/index.js'
import checkRule from '../checkField/index.js'
import fieldRules from '../../configure/base/fieldRules'
import storage from '../../lib/storage/index'

function check (value, checkList) {
    for (var i = 0; i < checkList.length; i++) {
        // resetCode();
        var checkStatus = checkRule[checkList[i]](value)
        if (!checkStatus) {
            return false;
        }
    }
    return true
}
function checkFields (key, value, rule) {
    var checkRule = rule.check
    var status = true
    if (!checkRule) {
        return status
    }
    var checkKey = checkRule.key
    var checkValue = checkRule.value
    if (checkKey) {
        status = check(key, checkKey)
        baseConfig.status.key = key;
        if (!status) {
            baseConfig.status.code = 400
            errorLog();
            // return status;
        }
    }
    if (checkValue) {
        baseConfig.status.code = 200;
        // if (key === 'd') {
        //     console.log(value)
        // }
        if (value && Util.paramType(value) == "Array") {
            baseConfig.status.key = key;
            for (var i = 0; i < value.length; i++) {
                status = check(value[i], ["isString", "length255"]);
                if (!status) {
                    baseConfig.status.value = value[i]
                    if (Util.paramType(value[i]) !== 'String') {
                        baseConfig.status.errorCode = "600013"
                    }
                    if (value[i].length > 500) {
                        value[i] = Util.stringSlice(value[i], 499) + '$'
                    }
                    baseConfig.status.code = 400;
                    errorLog();
                }
            }

            return status;
        }
        status = check(value, checkValue);
        if (Util.paramType(value) !== 'Array') {
            baseConfig.status.value = value
        }
        if (!status) {
            baseConfig.status.code = 400;
            errorLog();
        }
    }
    return status
}
function fillField (feilds, rules) {
    // 添加场景值   能返回场景值 $referrer 和 $scene 都用场景值，假如拿不到场景值 $referrrer 用 path;
    // try {
    //     let scene = await scenePromise();
    //     console.log('scene', scene);
    //     // 存在参数的 utm 赋值
    //     if (Object.keys(scene.query).length > 0) {
    //         UTM.utm_campaign_id = scene.query.campaign_id;
    //         UTM.utm_campaign = scene.query.utm_campaign;
    //         UTM.utm_content = scene.query.utm_content;
    //         UTM.utm_medium = scene.query.utm_medium;
    //         UTM.utm_source = scene.query.utm_source;
    //         UTM.utm_term = scene.query.utm_term;
    //         // 关于分享的赋值引用
    //         if (scene.query.share_id && scene.query.share_level && scene.query.share_path) {
    //             baseConfig.base.$share_id = scene.query.share_id;
    //             baseConfig.base.$share_level = scene.query.share_level;
    //             console.log("进来这里赋值")
    //             baseConfig.base.$share_path = scene.query.share_path;
    //         }
    //     }
    // } catch (err) {
    //     // baseConfig.status.errorCode = 600024;
    //     // errorLog();
    // }
    var rulesList = rules || fieldRules
    var obj = {}
    for (var key in feilds) {
        var feild = feilds[key]
        var rule = rulesList[key]
        if (!rule) {
            continue
        }
        var feildValue = ''
        if (Util.paramType(feild) === 'Object') {
            var content = fillField(feild, rule)
            obj[key] = content
        } else {
            if (Util.objHasKay(rule, 'valueType')) {
                if (rule.valueType === 0) {
                    feildValue = rule.value();
                    // if (checkFields(key, feildValue, rule)) {
                    //     obj[key] = feildValue
                    // } else {
                    //     if (baseConfig.status.errorCode === '600019') {
                    if (Util.paramType(feildValue) == 'String' && feildValue.length > 500) {
                        obj[key] = Util.stringSlice(feildValue, 499) + '$'
                    } else {
                        obj[key] = feildValue
                    }
                    //     } else {
                    //         obj[key] = ''
                    //     }
                    //     errorLog()
                    // }
                }
                if (rule.valueType === 1) {
                    feildValue = rule.value
                    // if (checkFields(key, feildValue, rule)) {
                    //     obj[key] = feildValue
                    // } else {
                    //     if (baseConfig.status.errorCode === '600019') {
                    if (Util.paramType(feildValue) == 'String' && feildValue.length > 500) {
                        obj[key] = Util.stringSlice(feildValue, 499) + '$'

                    } else {
                        obj[key] = feildValue
                    }
                    //     } else {
                    //         obj[key] = ''
                    //     }
                    //     errorLog()
                    // }
                }
            }
        }
    }
    return obj
}


function resetCode () {
    baseConfig.status = {
        "code": 200,
        "FnName": baseConfig.status.FnName,
        "key": "",
        "value": "",
        "errorCode": "",
        "successCode": ""
    }
}

function clearCache (resetStatus) {
    resetStatus = resetStatus || false
    if (!resetStatus) {
        var config = baseConfig.base
        for (var key in config) {
            if (Util.paramType(config[key]) !== 'Object') {
                if (key === '$debug' || key === 'appid' || key === 'uploadURL') {
                    var keyStorage = Storage.getLocal('ANS' + key.toUpperCase())
                    if (keyStorage !== config[key]) {
                        resetStatus = true
                    }
                    if (resetStatus) {
                        Storage.setLocal('ANS' + key.toUpperCase(), config[key])
                    }
                }
            }

        }
    }
    if (resetStatus) {
        storage.removeLocal('ARKSUPER')
        storage.removeData('STARTUP')
        storage.setLocal("FRISTDAY", Util.format(new Date(), 'yyyyMMdd'));
        if (baseConfig.base.allowTimeCheck && baseConfig.base.logflag) {
            let timeString = Util.format(new Date(+new Date() + (storage.getLocal("ANSSERVERTIME") ? Number(storage.getLocal("ANSSERVERTIME")) : 0)), 'yyyyMMdd')
            storage.setLocal("FRISTDAY", timeString);
        }
        storage.setLocal("FRISTIME", true)
        storage.removeLocal("POSTDATA")
        storage.removeLocal("ANSSERVERTIME")
        storage.removeLocal("ARKFRISTPROFILE");
        // ARKFRISTPROFILESEND  是 是否发送过 profile_set_once 的标识， ARKFRISTPROFILE 在startUp的存储的startUp的时间。
        // 防止关闭 autoProfile 后，获取预置属性拿不到 first_visit_time
        storage.removeLocal("ARKFRISTPROFILESEND");
    }
    return resetStatus
}


function checkBase () {
    for (var key in baseConfig.base) {
        resetCode()
        // baseConfig.status.FnName = 'AnalysysAgentInit'
        baseConfig.status.key = key
        var rule = fieldRules[key]
        if (key === '$debug') {
            rule = fieldRules['xcontext'][key]
        }
        if (key === '$lib_version') {
            rule = fieldRules['xcontext'][key]
        }
        var checkValue = rule

        if (checkValue && !checkFields(key, baseConfig.base[key], checkValue)) {
            baseConfig.base[key] = ''
            return false
        }
        successLog()
    }
    return true
}


function checkPrivate (obj, ruleName, isKey, keyName) {
    resetCode()
    var rule = fieldRules[ruleName] || fieldRules.xcontextCommonRule
    if (Util.paramType(obj) !== 'Object' || isKey == true) {
        var checkKey = rule.check.key
        var status = check(obj, checkKey)
        baseConfig.status.key = obj;
        // if (keyName) {
        //     baseConfig.status.key = obj || keyName;
        // }
        if (!status) {
            errorLog()
            if (keyName == "aliasId" || keyName == "distinctId") {
                return false;
            }
            // return false
        }
        return true;
    } else {
        // 判断是否为 {} 不然返回 true;
        if (Object.keys(obj).length == 0) {
            baseConfig.status.errorCode = 600021
            baseConfig.status.value = 0;
            errorLog()
            // return false;
        }
        for (var key in obj) {
            var status = checkFields(key, obj[key], rule);
            // 循环 obj,假如包含关键字，把关键字的值，全部回复成默认初始值。
            if (key == "$lib" || key == "$lib_version" || key == "$platform") {
                obj[key] = baseConfig.base[key];
            }
            if (!status) {
                if (baseConfig.status.errorCode === '600019') {
                    if (obj[key].length > 500) {
                        obj[key] = Util.stringSlice(obj[key], 499) + '$'
                    }
                }
                // return false;
            }
        }
        return true
    }
}

export {
    fillField,
    resetCode,
    checkPrivate,
    clearCache
}