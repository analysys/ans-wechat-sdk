import sendData from '../sendData'
import fillData from '../fillData'
import { getSuperProperty } from '../../store/core'
import { eventAttribute } from '../../store/eventAttribute'

function end () {

  // 获取上报数据模块
  const res = fillData('$end')

  const attrs = {
    $duration: res.xwhen - eventAttribute.startup.xwhen
  }

  // 合并通用属性
  res.xcontext = Object.assign({}, res.xcontext, getSuperProperty(), attrs)

  sendData(res)

}

export default end