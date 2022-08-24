
import sendData from '../sendData'
import fillData from '../fillData'
import { getPageProperty, delPageProperty } from '../../store/pageProperty'
import { getSuperProperty } from '../../store/core'
import { eventAttribute } from '../../store/eventAttribute'

function pageClose () {

  // 获取上报数据模块
  const res = fillData('page_close')

  // 过滤掉某些机型获取不到$url的pageclose
  if (res.xcontext && !res.xcontext.$url) {
    return
  }

  const attrs = {
    pagestaytime: res.xwhen - eventAttribute.pageview.xwhen
  }

  // 合并通用属性 // 绑定页面属性
  res.xcontext = Object.assign({}, res.xcontext, getSuperProperty(), getPageProperty(), attrs)
  
  // 删除页面属性
  delPageProperty()

  sendData(res)
}

export default pageClose