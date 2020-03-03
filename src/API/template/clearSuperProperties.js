import storage from '../../lib/storage/index'
import baseConfig from '../../lib/baseConfig/index'
import { successLog } from '../../lib/printLog/index'
import { resetCode } from '../../lib/fillFiled/index'

function clearSuperProperties () {
    baseConfig.status.FnName = '$clearSuperProperties'
    resetCode()
    storage.setLocal('ARKSUPER', {})
    baseConfig.status.successCode = "20004"
    successLog()
}

export {
    clearSuperProperties
}