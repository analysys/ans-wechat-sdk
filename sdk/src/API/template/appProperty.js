import bascConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import baseConfig from '../../lib/baseConfig/index';
import { errorLog, successLog } from '../../lib/printLog';


function appProperty (obj) {
    resetCode();
    baseConfig.status.FnName = "$appProperty";
    if (Util.paramType(obj) == "Object" && obj) {
        checkPrivate(obj)
    } else {
        bascConfig.status.errorCode = "600016";
        bascConfig.status.value = JSON.stringify(obj);
        errorLog();
        return;
    }
    if (bascConfig.base.appProperty) {
        for (var key in obj) {
            bascConfig.base.appProperty[key] = obj[key]
        }
    } else {
        bascConfig.base.appProperty = obj
    };
    bascConfig.status.successCode = "20002";
    bascConfig.status.value = JSON.stringify(obj);
    successLog();

}

export {
    appProperty
}