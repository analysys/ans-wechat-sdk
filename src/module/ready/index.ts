import { setNetwork, isGetNetWork } from '../../store/network'
import { getServerTime, isGetServerTime } from '../../store/time'
import { core, resetCore, setCoreParams } from '../../store/core'
import { config } from '../../store/config'
import lifecycleHook from '../../store/lifecycleHook'
/**
 * 准备就绪后开始上报数据
 */

interface callbackArrType {
  fn: (args: any[]) => void;
  arg: any;
}

const callbackArr: callbackArrType[] = []

let isReady = false

function ready (callback) {
  return function(...args: any[]) {

    // 没有获取过NetWork和ServerTime之前先把触发事件存起来，等NetWork和ServerTime获取过后再调用
    if (!isGetNetWork || !isGetServerTime) {
      callbackArr.push({
        fn: callback,
        arg: args
      })

      if (!isReady) {
        Promise.all([setNetwork(), getServerTime()]).then(function() {
          const ARKDEBUG = core.ARKDEBUG
          if (config.appkey !== core.ARKAPPID || (ARKDEBUG === 1 && ARKDEBUG !== config.debugMode) || core.ARKUPLOADURL !== config.uploadURL) {
            if (core.ARKAPPID) {
              resetCore()
            }
            setCoreParams({
              ARKAPPID: config.appkey,
              ARKDEBUG: config.debugMode,
              ARKUPLOADURL: config.uploadURL
            })
          }
          
          // onReady函数，sdk生命周期钩子,sdk初次初始化完成(采集数据之前的准备工作已到位)
          lifecycleHook.onReady(config)

          callbackArr.forEach(o => {
            o.fn.apply(o.fn, o.arg)
          })
        })
        isReady = true
      }

    } else {
      callback.apply(callback, args)
    }
  }
}

export default ready