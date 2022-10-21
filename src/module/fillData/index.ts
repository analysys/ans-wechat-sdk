
import { buriedPointData } from '../../types'
import { config } from '../../store/config'
import getAttr from './getAttr'
import { events, publicAttrs } from '../../constant/eventAttrs'

export default function (eventName: string) : buriedPointData {
  const obj = {
    appid: config.appkey,
    xwho: getAttr.xwho(),
    xwhat: getAttr.xwhat(eventName),
    xwhen: getAttr.xwhen(),
    xcontext: {}
  }

  const event = events[eventName]

  // 设置事件属性
  function setEventAttr(attrName) {
    let getAttrFn = getAttr[attrName]
    if (getAttrFn) {
      const value = getAttrFn()
      if (value !== '' && value !== null && value !== undefined) {
        obj.xcontext[attrName] = value
      }
    }
  }

  // 填充公共属性
  publicAttrs.forEach(o => {
    setEventAttr(o)
  })

  // 填充事件私有属性
  if (event) {
    event.forEach(o => {
      setEventAttr(o)
    })
  }

  return obj
}