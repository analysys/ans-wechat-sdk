import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index';

function profileUnset (key) {
    baseConfig.status.FnName = '$profile_unset';
    resetCode();
    var obj = Util.toObj(key, '');
    // var status = checkPrivate(obj, '$profile_unset');
    // if (!status) return;
    checkPrivate(obj, '$profile_unset');
    var profileUnsetTemp = temp('$profile_unset');
    let res = fillField(profileUnsetTemp);
    res = Util.delEmpty(res);
    res.xcontext = Util.objMerge(res.xcontext, obj);
    // 因为是 清除属性，所以上传的千万不能 把空值删除掉
    sendData(res);
}
export {
    profileUnset
}