import { temp } from '../../lib/mergeRules/index';
import { fillField } from '../../lib/fillFiled/index';
import { resetCode } from '../../lib/fillFiled/index';
import baseConfig from '../../lib/baseConfig';
import Util from '../../lib/common/index';
import { successLog } from '../../lib/printLog';


// 获取预置属性
function getPresetProperties () {
    baseConfig.status.FnName = "getPresetProperties"
    resetCode();
    // 获取模板
    let presetTemp = temp('$getPresetProperties');
    let res = fillField(presetTemp);
    // fillField(presetTemp).then(function (res) {
    res = Util.delEmpty(res);
    delete res.xcontext.$is_login;
    baseConfig.status.successCode = "20010";
    baseConfig.status.value = JSON.stringify(res.xcontext);
    successLog();
    return res.xcontext;
    // })
    // baseConfig.status.errorCode = "20009";
    // successLog();
}

export {
    getPresetProperties
}
