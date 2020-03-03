import { track } from './track'
import id from '../../lib/fillFiled/id'
import baseConfig from '../../lib/baseConfig/index'
import { checkTimePromise } from '../../lib/checkTime/checkTimePromise'
import PublicApp from '../../lib/common/publicApp.js'
import storage from '../../lib/storage';
let systemPromise = PublicApp.System.systemPromise
let netWorkPromise = PublicApp.Network.netWorkPromise
function share(obj) {
    let xwho = id.getId();
    if (!baseConfig.base.autoShare) {
        return obj
    }
    let pageUrl = PublicApp.Router.getPath();
    Promise.all([systemPromise(), netWorkPromise(), checkTimePromise(), storage.initLocalData()]).then((res) => {
        track('$share', {
            '$share_id': xwho,
            '$share_level': Number(baseConfig.base.$share_level) + 1,
            '$share_path': pageUrl
        })
    })
    var shareParam = 'share_id=' + xwho + '&share_level=' + (Number(baseConfig.base.$share_level) + 1) + '&share_path=' + encodeURIComponent(pageUrl)
    if (obj.path) {
        if (obj.path.indexOf('?') > -1) {
            obj.path = obj.path + '&' + shareParam
        } else {
            obj.path = obj.path + '?' + shareParam
        }
    } else {
        obj.path = pageUrl + '?' + shareParam
    }
    return obj
}
export { share }