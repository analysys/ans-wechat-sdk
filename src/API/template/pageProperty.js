import bascConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import baseConfig from '../../lib/baseConfig/index';
import { errorLog, successLog } from '../../lib/printLog';


function pageProperty (obj) {
    resetCode();
    baseConfig.status.FnName = "$pageProperty";
    if (Util.paramType(obj) == "Object") {
        checkPrivate(obj)
    } else {
        bascConfig.status.errorCode = "600016";
        bascConfig.status.value = JSON.stringify(obj);
        errorLog();
        return;
    }
    if (bascConfig.base.pageProperty) {
        for (var key in obj) {
            bascConfig.base.pageProperty[key] = obj[key]
        }
    } else {
        bascConfig.base.pageProperty = obj
    };
    bascConfig.status.successCode = "20002";
    bascConfig.status.value = JSON.stringify(obj);
    successLog();
}

export {
    pageProperty
}