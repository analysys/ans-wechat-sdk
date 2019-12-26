import baseConfig from '../../lib/baseConfig/index'
import Util from '../../lib/common/index'
import storage from '../../lib/storage/index'
import {
    resetCode,
    checkPrivate
} from '../../lib/fillFiled/index'
import {
    temp
} from '../../lib/mergeRules/index'
import {
    fillField
} from '../../lib/fillFiled/index'
import {
    sendData
} from '../../lib/upload/index'
import {
    setFirstProfile
} from './setFirstProfile'

function alias(aliasId) {
    baseConfig.status.FnName = '$alias'
    resetCode()
    var status = true;
    //检测aliasId  参数必须
    status = checkPrivate(aliasId, '$alias', true, "aliasId"); //增加第三参数 确保进入 校验区间
    if (!status) return;
    storage.setLocal('ARK_LOGINID', aliasId)
    //检测distinctId  参数必须 
    // if (arguments.length > 1) {
    //     if (distinctId != "" && distinctId != undefined && distinctId != null) {
    //         status = checkPrivate(distinctId, '$alias', true, "distinctId")
    //         if (status) {
    //             storage.setLocal('ARK_TRACKID', distinctId, true)
    //         }
    //     }
    // }
    // 获取模板 
    var aliasTemp = temp('$alias');
    let res = fillField(aliasTemp);
    res = Util.delEmpty(res);
    // 是否设置自动采集
    if (baseConfig.base.autoProfile != true) {
        sendData(res)
    } else {
        // 数据存储本地先，用自动采集上报;
        storage.setLocal("POSTDATA", Util.objInArray(res));
        setFirstProfile('alias')
    }
}

export {
    alias
}
