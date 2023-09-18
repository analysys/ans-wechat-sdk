import { setNetwork, isGetNetWork } from '../../store/network'
import { getServerTime, isGetServerTime } from '../../store/time'
import { core, resetCore, setCoreParams } from '../../store/core'
import { config, isInitConfig } from '../../store/config'
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
export const isReady = () => isGetServerTime && isInitConfig && isGetNetWork

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

// function ready (callback) {
//   return function(...args: any[]) {

//     // 没有获取过NetWork和ServerTime之前先把触发事件存起来，等NetWork和ServerTime获取过后再调用
//     if (!isGetNetWork || !isGetServerTime) {
//       callbackArr.push({
//         fn: callback,
//         arg: args
//       })

//       if (!isReady) {
//         Promise.all([setNetwork(), getServerTime()]).then(function() {
//           const ARKDEBUG = core.ARKDEBUG
//           if (config.appkey !== core.ARKAPPID || (ARKDEBUG === 1 && ARKDEBUG !== config.debugMode) || core.ARKUPLOADURL !== config.uploadURL) {
//             if (core.ARKAPPID) {
//               resetCore()
//             }
//             setCoreParams({
//               ARKAPPID: config.appkey,
//               ARKDEBUG: config.debugMode,
//               ARKUPLOADURL: config.uploadURL
//             })
//           }
          
//           // onReady函数，sdk生命周期钩子,sdk初次初始化完成(采集数据之前的准备工作已到位)
//           lifecycleHook.onReady(config)

//           implementAallbackArr()
//         })
//         isReady = true
//       }
//     } else {
//      return callback.apply(callback, args)
//     }
//   }
// }

export default ready