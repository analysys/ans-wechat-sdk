import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import storage from '../../lib/storage/index'
import { resetCode } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index'

function userClick () {
    let args = arguments;
    if (args.length > 0 && args[0] && Util.paramType(args[0]) === "Object" && (args[0].type == "tap" || args[0].type == "longtap" || args[0].type == "longpress")) {
        baseConfig.base.userObj = arguments[0];
        // 判断是不是 三者点击之一  ，tab  longtab ，longPress
        baseConfig.status.FnName = "$user_click";
        resetCode()
        // 启动字段模板
        let trackTemp = temp('$userClick');
        let res = fillField(trackTemp);
        res = Util.delEmpty(res)
        // 获取超级属性
        let arkSuper = storage.getLocal('ARKSUPER') || {}
        if (Object.keys(arkSuper).length > 0) {
            res.xcontext = Util.objMerge(res.xcontext, arkSuper);
        }
        sendData(res);
        baseConfig.base.userObj = {}
    }
}


export {
    userClick
}
