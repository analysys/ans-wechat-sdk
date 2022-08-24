/**
 * 小程序插件版sdk
 */

import { initConfig } from './types'
import { setConfig } from './store/config'
import { globalWindow, optionsDefault } from './constant/index'
import { coreInit } from './store/core'
import ready from './module/ready'
import { successLog } from './module/printLog/index'
import {
  pageView,
  profileSetOnce, profileSet, profileAppend, profileIncrement, profileDelete, profileUnset,
  reset,
  share,
  track,
  alias,
  registerSuperProperty, registerSuperProperties, getSuperProperty, getSuperProperties,
  unRegisterSuperProperty,
  clearSuperProperties,
  getPresetProperties,
  identify,
  getDistinctId,
  pageProperty
} from './module/methods/index'
import {AppFn, PageFn, ComponentFn} from './module/autoTrigger'

class ArkWxSdk {
  constructor () {
    coreInit()
  }
  config: initConfig = optionsDefault();
  pageView = ready(pageView);
  share = share;
  registerSuperProperty = registerSuperProperty;
  registerSuperProperties = registerSuperProperties;
  getSuperProperty = getSuperProperty;
  getSuperProperties = getSuperProperties;
  unRegisterSuperProperty = unRegisterSuperProperty;
  clearSuperProperties = clearSuperProperties;
  profileSetOnce = profileSetOnce;
  profileSet = profileSet;
  profileAppend = profileAppend;
  profileIncrement = profileIncrement;
  profileDelete = profileDelete;
  profileUnset = profileUnset;
  reset = reset;
  track = track;
  alias = alias;
  getPresetProperties = getPresetProperties;
  identify = identify;
  getDistinctId = getDistinctId;
  pageProperty = pageProperty;

  // 初始化传入配置
  init (config: initConfig) {
    setConfig(config).then(o => {
      this.config = o
      successLog({
        code: 20007
      })
    })
  }

  App (app) {
    AppFn(app)
  }

  Page (page) {
    PageFn(page)
  }
}

// 初始化传入配置
Object.keys(optionsDefault()).forEach(o => {
  Object.defineProperty(ArkWxSdk.prototype, o, {
    get: function get() {
      return this.config[o];
    },
    set: function set(value) {
      const _this = this;
      setConfig({
        [o]: value
      }).then(function (o) {
         _this.config = o;
      })
    },
    enumerable: false,
    configurable: true
  })
})
const ArkSdk = new ArkWxSdk()
globalWindow.AnalysysAgent = ArkSdk

Component = ComponentFn

export default ArkSdk