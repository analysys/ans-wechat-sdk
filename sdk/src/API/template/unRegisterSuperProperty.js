import baseConfig from '../../lib/baseConfig/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import storage from '../../lib/storage/index'
import { successLog } from '../../lib/printLog/index'
import Util from '../../lib/common/index';

function unRegisterSuperProperty (superPropertyName) {
    baseConfig.status.FnName = '$unregisterSuperProperty'
    resetCode()
    let status = checkPrivate(superPropertyName);
    // if (!status) return;
    let arkSuper = storage.getLocal('ARKSUPER') || {};
    // let superProperty = arkSuper[superPropertyName];
    if (!arkSuper.hasOwnProperty(superPropertyName)) {
        baseConfig.status.successCode = '20011'
        baseConfig.status.value = superPropertyName
        successLog();
        return
    }
    // if (Util.paramType(superProperty) == "String" && superProperty.length == 0) {
    //     baseConfig.status.successCode = '20011'
    //     baseConfig.status.value = superPropertyName
    //     successLog();
    //     return
    // }
    delete arkSuper[superPropertyName];
    storage.setLocal('ARKSUPER', arkSuper)
    baseConfig.status.successCode = "20003"
    baseConfig.status.value = superPropertyName
    successLog()
}
export {
    unRegisterSuperProperty
}