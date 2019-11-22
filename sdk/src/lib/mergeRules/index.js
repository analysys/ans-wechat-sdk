/**
 * 生产事件日志模板
 * commonTemp 为公用事件模板，用于自定义事件日志
 */
import Util from '../common/index'
import fieldTemplateBase from '../../configure/base/fieldTemplate'
// 招行字段表
// import fieldTemplateZh from '../../configure/customized/zh/fieldTemplate'

// 字段表合并队列。
let plugList = [];

// 字段表的合并
let fieldTemplate = fieldTemplateBase || {};
for (var i = 0; i < plugList.length; i++) {
    fieldTemplate = Util.objMerge(fieldTemplateBase, plugList[i])
}

var eventTemp = {}
var commonTemp = {}
var baseTemp = fieldTemplate.base
var outerTemp = baseTemp.outer
for (var i = 0; i < outerTemp.length; i++) {
    if (baseTemp[outerTemp[i]]) {
        commonTemp[outerTemp[i]] = Util.toObj(baseTemp[outerTemp[i]])
    } else {
        commonTemp[outerTemp[i]] = ''
    }
}
for (var key in fieldTemplate) {
    if (key != 'base') {
        eventTemp[key] = Util.objMerge(commonTemp, Util.toDeepObj(fieldTemplate[key]))
    }
}

eventTemp['commonTemp'] = commonTemp

function temp (eventName) {
    return eventTemp[eventName] || eventTemp.commonTemp
}


export { temp }