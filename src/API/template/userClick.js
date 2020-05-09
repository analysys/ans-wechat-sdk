import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index'

function userClick () {
    if (arguments.length > 0 && arguments[0] && (arguments[0].type == "tap" || arguments[0].type == "longtap" || arguments[0].type == "longpress")) {
        baseConfig.base.userObj = arguments[0];
        // 判断是不是 三者点击之一  ，tab  longtab ，longPress
        baseConfig.status.FnName = "$user_click";
        resetCode()
        // 启动字段模板
        let trackTemp = temp('$userClick');
        let res = fillField(trackTemp);
        res = Util.delEmpty(res)
        sendData(res);
        baseConfig.base.userObj = {}
    }
}


export {
    userClick
}
