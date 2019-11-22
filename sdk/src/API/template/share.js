import { track } from './track'
import id from '../../lib/fillFiled/id'
import baseConfig from '../../lib/baseConfig/index'

function share (obj) {
    let xwho = id.getId();
    if (!baseConfig.base.autoShare) {
        return
    }
    let pageRoute = getCurrentPages();
    let pageUrl = pageRoute[pageRoute.length - 1].__route__;
    track('$share', {
        '$share_id': xwho,
        '$share_level': Number(baseConfig.base.$share_level) + 1,
        '$share_path': pageUrl
    })
    var shareParam = 'share_id=' + xwho + '&share_level=' + (Number(baseConfig.base.$share_level) + 1) + '&share_path=' + encodeURIComponent(pageUrl)
    if (obj.path) {
        if (obj.path.indexOf('?') > -1) {
            obj.path = obj.path + '&' + shareParam
        } else {
            obj.path = obj.path + '?' + shareParam
        }
    } else {
        obj.path = '/' + pageUrl + '?' + shareParam
    }
    return obj
}
export { share }