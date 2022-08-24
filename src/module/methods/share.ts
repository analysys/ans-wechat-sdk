
import { getId } from '../../store/core'
import { getPath } from '../../utils/path'
import { isObject } from '../../utils/type'
import fillData from '../fillData'
import ready from '../ready'
import sendData from '../sendData'
import { pathParams } from '../../store/pathParams'
import { attrCheck } from '../../utils/verify/index'
import { getSuperProperty } from '../../store/core'

function share (toShareProperties, properties) {

  const xwho = getId()
  const pageUrl = getPath()
  const shareLevel = Number(pathParams.share_level) + 1

  if (!isObject(toShareProperties)) {
    toShareProperties = {
      path: pageUrl
    }
  }

  const sendShare = function() {

    // 获取上报数据模块
    const res = fillData('$share')
    
    const shareObj = {
      '$share_id': xwho,
      '$share_level': shareLevel,
      '$share_path': pageUrl
    }

    let attrs = {}
    if (properties) {
      attrs = attrCheck(properties, '$share')
    }
    res.xcontext = Object.assign({}, res.xcontext, shareObj, getSuperProperty(), attrs)
    sendData(res)

  }

  ready(sendShare)()

  const shareParam = 'share_id=' + xwho + '&share_level=' + shareLevel + '&share_path=' + encodeURIComponent(pageUrl)
  toShareProperties.path = toShareProperties.path || pageUrl
  const str = (toShareProperties.path.indexOf('?') > -1) ? '&' : '?'
  toShareProperties.path = toShareProperties.path + str + shareParam


  return toShareProperties

}

export default share