import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index';

function profileSet (key, value) {
    baseConfig.status.FnName = '$profile_set'
    resetCode()
    let obj = Util.toObj(key, value)
    // let status = checkPrivate(obj);
    // if (!status) return;
    checkPrivate(obj);
    let profileSetTemp = temp('$profile_set')
    let res = fillField(profileSetTemp);
    res = Util.delEmpty(res);
    res.xcontext = Util.objMerge(res.xcontext, obj)
    sendData(res);
}

export {
    profileSet
}