import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import storage from '../../lib/storage/index'
import { successLog } from "../../lib/printLog/index"

function registerSuperProperties (key, value) {
    baseConfig.status.FnName = '$registerSuperProperties'
    resetCode();
    //自定义的，不做任何修改，即使 k-v 均为空 
    let obj = Util.toObj(key, value);
    checkPrivate(obj);
    // let status = true;
    // status = checkPrivate(key);  //必须校验第一个参数，防止调用 不传参情况，可能会上传空对象。
    // if (!status) return;
    // let obj = Util.toObj(key, value);
    // status = checkPrivate(obj);   //没有去空操作，符合条件的没有值
    // if (!status) return;
    let arkSuper = storage.getLocal('ARKSUPER') || {}
    let saveArkSuper = Util.objMerge(arkSuper, obj)
    storage.setLocal('ARKSUPER', saveArkSuper)
    baseConfig.status.successCode = "20002"
    baseConfig.status.value = JSON.stringify(obj);
    successLog();
}
export {
    registerSuperProperties
}