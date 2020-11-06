import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import { resetCode, checkPrivate } from '../../lib/fillFiled/index'
import storage from '../../lib/storage/index'
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import { sendData } from '../../lib/upload/index'

function pageView (pageName, obj) {
    baseConfig.status.FnName = "$pageview";
    resetCode();
    // let status = true;
    let userobj = {}
    // pageName 的校验
    let nameObj = { '$title': "" };
    if (arguments.length > 0) {
        if (Util.paramType(pageName) === "String") {
            nameObj.$title = pageName
            checkPrivate(nameObj);
        } else if (Util.paramType(pageName) === "Object") {
            checkPrivate(pageName);
            userobj = pageName
        }
        if (arguments.length > 1) {
            checkPrivate(obj);
            if (Util.paramType(obj) === "Object") {
                userobj = obj;
            }
        }
    }
    // if (arguments.length > 0 && Util.paramType(pageName) == "String") {
    //     nameObj = { "$title": pageName };
    //     checkPrivate(nameObj);
    //     // status = checkPrivate(pageName, '$pageview', true);//增加 第三参数 true，确保进入校验区间
    //     // 更改后的上传  k-v ，对于用户自定义的k-v,不符合规则的不在阻拦，直接上报，但要有错误提示。
    //     // if (!status) return;
    // }
    let pageViewTemp = temp('$pageview');
    let res = fillField(pageViewTemp);
    res = Util.delEmpty(res);
    // pageView track startUp 需要合并超级属性
    let arkSuper = storage.getLocal('ARKSUPER') || {}
    if (Object.keys(arkSuper).length > 0) {
        res.xcontext = Util.objMerge(res.xcontext, arkSuper);
    };
    let appProperty = baseConfig.base.appProperty;
    if (Util.paramType(appProperty) == "Object") {
        res.xcontext = Util.objMerge(res.xcontext, appProperty);
    }
    res.xcontext = Util.objMerge(res.xcontext, userobj || {});
    // 预置属性不可以为空，所以在初始 去空操作，后续不在合并可能为空的属性.
    if (pageName && Util.paramType(pageName) == "String") {
        res.xcontext = Util.objMerge(res.xcontext, nameObj)
        // res.xcontext = Util.objMerge(res.xcontext, { '$title': pageName });
    }
    sendData(res)

}

export {
    pageView
}
