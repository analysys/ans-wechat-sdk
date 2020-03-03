import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import storage from '../../lib/storage/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index'

function track (eventName, obj) {
    baseConfig.status.FnName = eventName;
    resetCode()
    let status = true;
    // status = checkPrivate(eventName, '$track')
    // if (!status) return
    checkPrivate(eventName, '$track', true);
    if (arguments.length > 1) {
        // status = checkPrivate(obj);
        // if (!status) return;
        checkPrivate(obj);
    };
    // 启动字段模板
    let trackTemp = temp('$track');
    let res = fillField(trackTemp);
    // res = Util.delEmpty(res);
    // 检查超级属性  上报合并超级属性的 有 pageView track startUp
    let arkSuper = storage.getLocal('ARKSUPER') || {}
    // 本地有超级属性 合并。 Object.keys(obj) 返回可枚举属性组成的数组
    res.xcontext = Util.delEmpty(res.xcontext);
    if (Object.keys(arkSuper).length > 0) {
        arkSuper = Util.objMerge(arkSuper, obj)
        res.xcontext = Util.objMerge(res.xcontext, arkSuper);
    } else {
        // 绑定参数的合并
        res.xcontext = Util.objMerge(res.xcontext, obj);
    }
    sendData(res);

}


export {
    track
}
