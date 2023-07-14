

import sendData from '../sendData'
import fillData from '../fillData'
import { getSuperProperty } from '../../store/core'
import { attrCheck } from '../../utils/verify'
import { errorLog } from '../printLog'
import { eventAttribute } from '../../store/eventAttribute'
import { getNow } from '../../store/time'

function track (eventName : string, eventAttrs : object) {

  if (!/^[a-zA-Z$][a-zA-Z0-9_]{1,99}$|^[a-zA-Z]$/.test(eventName)) {
    errorLog({
      code: 600025,
      fn: 'track',
      value: eventName
    })
    return 
  }

  // 获取上报数据模块
  const res = fillData('track')

  res.xwhat = eventName

  // 合并通用属性
  res.xcontext = Object.assign({}, res.xcontext, getSuperProperty(), attrCheck(eventAttrs, eventName))

  // 增加使用时长属性
  if (eventAttribute.timeEvent[eventName]) {
    res.xcontext['$duration'] = getNow() - eventAttribute.timeEvent[eventName]
    delete eventAttribute[eventName]
  }

  sendData(res)
  
}

export default track