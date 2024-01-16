import { isGetNetWork } from '../../store/network'
import { isGetServerTime } from '../../store/time'
import { config } from '../../store/config'
import lifecycleHook from '../../store/lifecycleHook'
import { getNow } from '../../store/time'

/**
 * 准备就绪后开始上报数据
 */

interface callbackArrType {
  fn: (args: any[]) => void;
  arg: any;
  xwhen?: number;
}

let callbackArr: callbackArrType[] = []
let callbackfirstArr: callbackArrType[] = []



// sdk是否准备就绪
export const isReady = () => isGetServerTime && isGetNetWork

// 执行缓存函数
export function implementAallbackArr () {
  

  if (isReady()) {

    // onReady函数，sdk生命周期钩子,sdk初次初始化完成(采集数据之前的准备工作已到位)
    lifecycleHook.onReady(config)

    // 执行sdk没有初始化完成之前缓存函数
    if (callbackfirstArr && callbackArr.length) {
      callbackfirstArr.forEach(o => {
        return o.fn.apply(o.fn, o.arg)
      })
      callbackfirstArr = []
    }

    if (callbackArr && callbackArr.length) {
      callbackArr.forEach(o => {
        return o.fn.apply(o.fn, o.arg)
      })
      callbackArr = []
    }
  }
}

function ready (callback, isTop?: boolean) {
  return function(...args: any[]) {
    if (!isReady()) {
      const obj = {
        fn: callback,
        arg: args,
        xwhen: getNow()
      }
      isTop ? callbackfirstArr.push(obj) : callbackArr.push(obj)
    } else {
      return callback.apply(callback, args)
    }
  }
}

export default ready