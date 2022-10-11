
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

  // 填充公共属性
  publicAttrs.forEach(o => {
    const value = getAttr[o]()
    if (value) {
      obj.xcontext[o] = value
    }
  })

  // 填充事件私有属性
  if (event) {
    event.forEach(o => {
      const value = getAttr[o] && getAttr[o]()
      if (value) {
        obj.xcontext[o] = value
      }
    })
  }

  return obj
}