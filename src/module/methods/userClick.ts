
import sendData from '../sendData'
import fillData from '../fillData'
import { isObject } from '../../utils/type'
import { getSuperProperty } from '../../store/core'
import { setUserClickAttrs } from '../../store/clickElement'

function userClick(...args: any[]) {

  if (args.length > 0 && args[0] && isObject(args[0]) && (args[0].type == "tap" || args[0].type == "longtap" || args[0].type == "longpress")) {
    let element_function = args[1]

    // 获取uniapp写的小程序函数方法名
    try {
      const eventOpts = args[0].target.dataset.eventOpts
      if (eventOpts) {
        element_function = eventOpts[0][1][0][0]
      }
    } catch (e) {
      console.log(e)
    }

    // 设置全埋点属性
    const elementAttrMap = args[0] && args[0].currentTarget && args[0].currentTarget.dataset ? args[0].currentTarget.dataset : {}
    setUserClickAttrs(Object.assign(elementAttrMap, { function: element_function }))

    // 获取上报数据模块
    const res = fillData('$user_click')

    // 合并通用属性
    res.xcontext = Object.assign({}, res.xcontext, getSuperProperty())

    sendData(res)
  }
}

export default userClick

/**
 * 底部tab拦点击触发
 */
export function userClickTab(tabItem) {

  setUserClickAttrs({
    function: 'onTabItemTap',
    name: tabItem.text
  })

  // 获取上报数据模块
  const res = fillData('$user_click')

  // 合并通用属性
  res.xcontext = Object.assign({}, res.xcontext, getSuperProperty())

  sendData(res)
}