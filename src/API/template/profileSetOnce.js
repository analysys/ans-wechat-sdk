import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index';

function profileSetOnce (key, value) {
    baseConfig.status.FnName = '$profile_set_once'
    resetCode()
    let obj = Util.toObj(key, value)
    // let status = checkPrivate(obj);
    // if (!status) return;
    checkPrivate(obj);
    let profileSetOnceTemp = temp('$profile_set_once');
    let res = fillField(profileSetOnceTemp);
    res = Util.delEmpty(res);
    res.xcontext = Util.objMerge(res.xcontext, obj);
    sendData(res)
}

export {
    profileSetOnce
}