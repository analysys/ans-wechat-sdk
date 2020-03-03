import baseConfig from '../../lib/baseConfig/index'
import storage from '../../lib/storage/index'
import { resetCode } from '../../lib/fillFiled/index'
import { successLog } from '../../lib/printLog/index'

function getSuperProperties () {
    baseConfig.status.FnName = '$getSuperProperties'
    resetCode()
    var arkSuper = storage.getLocal('ARKSUPER') || {}
    baseConfig.status.successCode = "20010"
    baseConfig.status.value = JSON.stringify(arkSuper)
    successLog()
    return arkSuper
}
export { getSuperProperties }