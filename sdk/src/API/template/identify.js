import baseConfig from '../../lib/baseConfig/index'
import storage from '../../lib/storage/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import { successLog } from '../../lib/printLog/index'

function identify (distinctId, isLogin) {
    baseConfig.status.FnName = '$identify'
    resetCode()
    var status = checkPrivate(distinctId, '$alias', true, "distinctId")
    if (!status) return;
    if (isLogin === true) {
        storage.setLocal('ARK_TRACK_LOGIN', true)
    }
    storage.setLocal('ARK_TRACKID', distinctId)
    baseConfig.status.successCode = "20002"
    baseConfig.status.value = distinctId
    successLog();
}

export {
    identify
}
