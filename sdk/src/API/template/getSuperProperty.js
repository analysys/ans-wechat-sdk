import baseConfig from '../../lib/baseConfig/index'
import {
    resetCode,
    checkPrivate
} from '../../lib/fillFiled/index'
import storage from '../../lib/storage/index'
import {
    successLog
} from "../../lib/printLog/index"
import Util from '../../lib/common/index'

function getSuperProperty(superPropertyName) {
    baseConfig.status.FnName = '$getSuperProperty';
    resetCode();
    let status = checkPrivate(superPropertyName, '$getSuperProperty', true);
    // if (!status) return;
    let arkSuper = storage.getLocal('ARKSUPER') || {}
    let superProperty = arkSuper[superPropertyName];
    // 属性值 可能为假，和没有属性值 一起进入到 成功打印。
    if (arkSuper.hasOwnProperty(superPropertyName)) {
        baseConfig.status.successCode = '20010'
        baseConfig.status.value = superProperty
        baseConfig.status.key = superPropertyName
        successLog();
        return superProperty;
    }
    // if (Util.paramType(superProperty) == "String" && superProperty.length > 0) {
    //     baseConfig.status.successCode = '20010'
    //     baseConfig.status.value = superProperty
    //     baseConfig.status.key = superPropertyName
    //     successLog();
    //     return ''
    // }
    baseConfig.status.successCode = "20009"
    baseConfig.status.key = superPropertyName
    successLog()
    return ""
}
export {
    getSuperProperty
}