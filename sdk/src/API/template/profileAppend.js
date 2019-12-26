import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index'

function profileAppend (key, value) {
    baseConfig.status.FnName = '$profile_append'
    resetCode()
    let obj = Util.toObj(key, value)
    // let status = checkPrivate(obj);
    // if (!status) return;
    checkPrivate(obj);  //只有单纯的校验作用。
    let profileAppendTemp = temp('$profile_append')
    // fillField(profileAppendTemp).then(function (res) {
    let res = fillField(profileAppendTemp);
    res = Util.delEmpty(res);
    res.xcontext = Util.objMerge(res.xcontext, obj)
    sendData(res)  //不再进行去空操作，因为有可能用户上传为 空
    // });
}
export {
    profileAppend
}