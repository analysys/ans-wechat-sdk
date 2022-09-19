
import { PageHook } from '../../constant/hook'
import { startUp, end, pageClose, pageView, share, userClick, userClickTab } from '../methods'
import { setPathParams } from '../../store/pathParams'
import ready from '../ready'
import { config } from '../../store/config'
import { isFunction } from '../../utils/type'
import { getPath } from '../../utils/path'
import { eventAttribute } from '../../store/eventAttribute'
import { getNow } from '../../store/time'


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

  appFnApply(methods, 'onShow', ()=> {
    // 是否自动采集pageview事件
    if (config.auto === true) {
      let path = getPath()

      // 防止多次自动触发pageView事件
      if (!eventAttribute.pageview.state[path]) {
        ready(pageView)()
        eventAttribute.pageview.state[path] = true
      }
    } else {

      // 未自动采集时，记录页面浏览时间
      eventAttribute.pageview.xwhen = getNow()
    }
  })
  

  // 监听页面离开
  if (config.autoPageViewDuration) {
    let statusClear = function () {
      let path = getPath()
      if (eventAttribute.pageview.state[path]) {
        delete eventAttribute.pageview.state[path]
      }
    }
    appFnApply(methods, 'onHide', () => {
      pageClose()
      statusClear()
    })
    appFnApply(methods, 'onUnload', () => {
      pageClose()
      statusClear()
    })
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
  appFnApply(app, 'onShow', () => {
    if (!eventAttribute.startup.state) {
      ready(startUp)()
      eventAttribute.startup.state = true
    }
  })

  // 全局监听app onHide事件
  appFnApply(app, 'onHide', () => {
    if (eventAttribute.startup.state) {
      end()
      eventAttribute.startup.state = false
    }
  })
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