import baseConfig from '../../lib/baseConfig/index';
import Util from '../../lib/common/index';
import { resetCode, clearCache } from '../../lib/fillFiled/index';
import { clearSuperProperties } from './clearSuperProperties';
import { successLog } from './../../lib/printLog/index'
import { profileSetOnce } from './profileSetOnce';
import id from '../../lib/fillFiled/id';
import sessionId from '../../lib/fillFiled/sessionId';
import storage from '../../lib/storage/index';

function reset () {
    // 清除的时候发送 reset-time ，应该是校准过的时间，清除之前应该先拿到时间
    var timeString = Util.format(new Date(), 'yyyy-MM-dd hh:mm:ss.SSS');
    if (baseConfig.base.allowTimeCheck && baseConfig.base.logflag) {
        timeString = +new Date() + (storage.getLocal("ANSSERVERTIME") ? Number(storage.getLocal("ANSSERVERTIME")) : 0)
    }
    timeString = Util.format(new Date(timeString), 'yyyy-MM-dd hh:mm:ss.SSS')


    //  清除 aliasID  idenyifyID  日志缓存 超级属性 起动记录 首次启动日期 首次用户属性 
    resetCode();
    id.removeARKId();       // "ARK_ID"
    id.removeTrackId();     // "ARK_TRACKID"
    id.removeLoginId();     // "ARK_LOGINID"
    id.removeIdentifyId();
    clearSuperProperties(); // 超级属性
    clearCache(true);
    //重置  sessionID  sessionData 
    sessionId.setId();
    if (baseConfig.base.autoProfile === true) {
        var resetTime = {
            '$reset_time': timeString
        }
        profileSetOnce(resetTime)
    }
    baseConfig.status.FnName = '$reset'
    baseConfig.status.successCode = "20005"
    successLog();
}

export {
    reset
}