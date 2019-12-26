import { profileSetOnce } from './profileSetOnce';
import { temp } from '../../lib/mergeRules/index'
import { fillField } from '../../lib/fillFiled/index'
import Util from '../../lib/common/index'
import baseConfig from '../../lib/baseConfig/index'
import { resetCode } from '../../lib/fillFiled/index'
import storage from '../../lib/storage/index'
import { pageView } from './pageView';
import { sendData } from '../../lib/upload/index';
import { getLanguage } from '../../lib/fillFiled/getField'


// 此方法为 不暴露 API ，功能只是在掉 多次上报的API 时 合并 一起上报
function setFirstProfile (type) {

    // 假如开启时间校准 和 符合时间校准的条件 第一次的时间应该是校验过的时间
    let time = Util.format(new Date(), 'yyyy-MM-dd hh:mm:ss.SSS');
    if (baseConfig.base.allowTimeCheck && baseConfig.base.logflag) {
        time = Util.format(new Date(+new Date() + (storage.getLocal("ANSSERVERTIME") ? Number(storage.getLocal("ANSSERVERTIME")) : 0)), 'yyyy-MM-dd hh:mm:ss.SSS');
    }
    let firstVisitTime = storage.getLocal('ARKFRISTPROFILE') || time
    let setOnce = {
        '$first_visit_time': firstVisitTime,
        '$first_visit_language': getLanguage()
    };
    let autoProfile = baseConfig.base.autoProfile;
    let auto = baseConfig.base.auto;
    // if (type == "startUp" || type == "appStart") {
    // startUp 除了 profileSetOnce 还有 pageView
    if (type == "startUp") {
        if (autoProfile === true) {
            var ARKFRISTPROFILE = storage.getLocal('ARKFRISTPROFILESEND') || false;
            if (ARKFRISTPROFILE == false) {
                storage.setLocal('ARKFRISTPROFILESEND', true);
                baseConfig.status.FnName = "$profile_set_once";
                resetCode();
                let profileSetOnceTemp = temp('$profile_set_once');
                let res = fillField(profileSetOnceTemp);
                res = Util.delEmpty(res);
                res.xcontext = Util.objMerge(res.xcontext, setOnce);
                let ARKPOST = storage.getLocal("POSTDATA");
                ARKPOST = [...ARKPOST, ...Util.objInArray(res)]
                storage.setLocal("POSTDATA", ARKPOST);
            }
        }
        if (auto === true) {
            pageView();
        } else {
            sendData({})
        }
    } else if (type == "alias") {
        if (baseConfig.base.autoProfile == true) {
            storage.setLocal('ARKFRISTPROFILESEND', true);
            profileSetOnce(setOnce)     // alias 不更新时间
            // return    在框架中这个 return 二次打包 有问题。
        }
    } else {
        return;
    }
}
export {
    setFirstProfile
}