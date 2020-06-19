import { track } from './track'
import id from '../../lib/fillFiled/id'
import baseConfig from '../../lib/baseConfig/index'
import { checkTimePromise } from '../../lib/checkTime/checkTimePromise'
import PublicApp from '../../lib/common/publicApp.js'
import storage from '../../lib/storage';
import Util from '../../lib/common/index'

let systemPromise = PublicApp.System.systemPromise
let netWorkPromise = PublicApp.Network.netWorkPromise
function share (toShareProperties, properties) {
    let xwho = id.getId();
    let pageUrl = PublicApp.Router.getPath();
    if (Util.paramType(toShareProperties) !== "Object") {
        toShareProperties = {
            path: pageUrl
        }
    }
    Promise.all([systemPromise(), netWorkPromise(), checkTimePromise(), storage.initLocalData()]).then((res) => {
        let shareLevel = parseInt(baseConfig.base.$share_level) ? parseInt(baseConfig.base.$share_level) : ""
        let shareOwn = {
            '$share_id': xwho,
            '$share_level': Number(shareLevel) + 1,
            '$share_path': pageUrl
        }
        if (Util.paramType(properties) === "Object") {
            shareOwn = Util.objMerge(shareOwn, properties)
        }
        track('$share', shareOwn)
    })
    let shareParam = 'share_id=' + xwho + '&share_level=' + (Number(baseConfig.base.$share_level) + 1) + '&share_path=' + encodeURIComponent(pageUrl)
    toShareProperties.path = toShareProperties.path || pageUrl
    if (toShareProperties.path.indexOf('?') > -1) {
        toShareProperties.path = toShareProperties.path + '&' + shareParam
    } else {
        toShareProperties.path = toShareProperties.path + '?' + shareParam
    }
    return toShareProperties
}
export { share }