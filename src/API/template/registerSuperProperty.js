import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import storage from '../../lib/storage/index'
import { successLog } from "../../lib/printLog/index"

function registerSuperProperty (key, value) {
    baseConfig.status.FnName = '$registerSuperProperty'
    resetCode();
    // 用户自定义的，有校验，不符合规则的，只提醒，不去除
    let obj = Util.toObj(key, value);
    checkPrivate(obj)
    // let status = true;
    // status = checkPrivate(key);    //checkPrivate 校验key 和 obj ，key过关直接组合obj检验即可。
    // if (!status) return;
    // let obj = Util.toObj(key, value);
    // status = checkPrivate(obj);
    // if (!status) return;          // obj 没有 去空操作，符合条件的，没有空值。
    let arkSuper = storage.getLocal('ARKSUPER') || {};
    let saveArkSuper = Util.objMerge(arkSuper, obj)
    storage.setLocal('ARKSUPER', saveArkSuper)
    baseConfig.status.successCode = "20002"
    baseConfig.status.value = JSON.stringify(obj)
    successLog()
}
export {
    registerSuperProperty
}