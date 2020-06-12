import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index'

function userClickPage () {
    if (arguments.length > 0 && arguments[0]) {
        baseConfig.base.userPageObj = arguments[0];
        baseConfig.status.FnName = "$user_click";
        resetCode()
        // 启动字段模板
        let trackTemp = temp('$userClick');
        let res = fillField(trackTemp);
        res = Util.delEmpty(res)
        sendData(res);
    }
}


export {
    userClickPage
}
