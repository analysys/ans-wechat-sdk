
import { PageHook } from '../../constant/hook'
import { startUp, end, pageClose, pageView, share, userClick, userClickTab } from '../methods'
import { setPathParams } from '../../store/pathParams'
import ready from '../ready'
import { config } from '../../store/config'
import { isFunction } from '../../utils/type'


// 原有生命周周期函数的封装 ，不影响小程序原有生命周期函数执行
export function appFnApply (obj, Fn, toFn) {
  const oldFn = obj[Fn]
  if (oldFn) {
    if (Fn === 'onShareAppMessage') {
      obj[Fn] = function (t) {
        return toFn(oldFn.call(this, t))
      }
    } else {
      obj[Fn] = function (t) {
        const b = oldFn.apply(this, arguments)
        toFn(t, Fn)
        return b
      }
    }
  } else {
    if (Fn !== 'onShareAppMessage') {
      obj[Fn] = function (t) {
        toFn(t)
      }
    }
  }
}


export function hookMethods (methods) {

  // 自动采集pageview事件
  if (config.auto === true) {
    appFnApply(methods, 'onShow', ready(pageView))
  }

  // 监听页面离开
  if (config.autoPageViewDuration) {
    appFnApply(methods, 'onHide', pageClose)
    appFnApply(methods, 'onUnload', pageClose)
  }

  if (config.autoShare == true) {
    appFnApply(methods, 'onShareAppMessage', share)
  }

  if (config.autoTrack == true) {
    for (const i in methods) {
      const item = methods[i]
      if (isFunction(item) && PageHook.indexOf(i) < 0) {
        appFnApply(methods, i, userClick)
      } else if(isFunction(item) && i == 'onTabItemTap') {
        appFnApply(methods, i, userClickTab)
      }
    }
  }
}


const APP = App
const PAGE = Page
const COMPONENT = Component


export function AppFn (app) {
  appFnApply(app, 'onLaunch', (option) => {
    setPathParams(option)
  })

  // 自动上报启动事件
  appFnApply(app, 'onShow', ready(startUp))

  // 全局监听app onHide事件
  appFnApply(app, 'onHide', end)

  APP(app)
}

export function PageFn (page) {
  hookMethods(page)
  PAGE(page)
}

export function ComponentFn (component) {
  if (component.methods) {
    hookMethods(component.methods)
  }
  COMPONENT(component)
}

/**
 * 小程序sdk自动触发器
 */

function autoTrigger () {
  App = AppFn
  Page = PageFn
  // hook Component
  Component = ComponentFn
}

export default autoTrigger