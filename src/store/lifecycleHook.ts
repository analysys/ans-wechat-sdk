

import { globalWindow } from '../constant/index'
import { isFunction } from '../utils/type'


const hookState = {
  isBeforeStartUp: false,
  isAfterStartUp: false,
  isBeforePageView: false,
  isAfterPageView: false
}

function lifecycleHook (stateKey: string, hookName: string, data?: object): any {
  if (!hookState[stateKey] && globalWindow.AnalysysAgent) {
    const hook = globalWindow.AnalysysAgent[hookName]
    if (isFunction(hook)) {
      hook(data)
    }
    hookState[stateKey] = true
  }
}

/**
 * sdk生命周期钩子
 */

export default {

  /**
   * sdk初次初始化完成(采集数据之前的准备工作已到位)
   */
  onReady (config) {
    if (globalWindow.AnalysysAgent) {
      const onReady = globalWindow.AnalysysAgent.onReady
      if (isFunction(onReady)) {
        onReady(config)
      }
    }
  },

  // 初始化完成后首次发送预制启动事件之前
  onBeforeStartUp (data) {
    lifecycleHook('isBeforeStartUp', 'onBeforeStartUp', data)
  },

  // 初始化完成后首次发送预制启动事件发送成功之后
  onAfterStartUp (data) {
    lifecycleHook('isAfterStartUp', 'onAfterStartUp', data)
  },

  // 初始化完成后首次发送预制浏览页面事件之前
  // onBeforePageView (data) {
  //   lifecycleHook('isBeforePageView', 'onBeforePageView', data)
  // },

  // 初始化完成后首次发送预制浏览页面事件之后
  // onAfterPageView (data) {
  //   lifecycleHook('isAfterPageView', 'onAfterPageView', data)
  // }
}