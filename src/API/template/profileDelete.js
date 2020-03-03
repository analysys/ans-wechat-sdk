import baseConfig from '../../lib/baseConfig/index'
import { resetCode } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index'
import Util from '../../lib/common/index'


function profileDelete () {
    baseConfig.status.FnName = '$profile_delete'
    resetCode()
    var profileDeleteTemp = temp('$profile_delete');
    let res = fillField(profileDeleteTemp);
    res = Util.delEmpty(res);
    sendData(res);
}

export {
    profileDelete
}