import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index'

function profileIncrement (key, value) {
    baseConfig.status.FnName = '$profile_increment'
    resetCode()
    let obj = Util.toObj(key, value)
    // let status = checkPrivate(obj, '$profile_increment');
    // if (!status) return;
    checkPrivate(obj, '$profile_increment');
    let profileIncrementTemp = temp('$profile_increment');
    let res = fillField(profileIncrementTemp);
    res = Util.delEmpty(res);
    res.xcontext = Util.objMerge(res.xcontext, obj);
    sendData(res);  //不再去空，因为用户自定义可能为空 
}

export {
    profileIncrement
}