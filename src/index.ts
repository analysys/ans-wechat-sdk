/**
 * 小程序标准版sdk
 */

import { initConfig } from './types'
import { setConfig, config } from './store/config'
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
  timeEvent,
  alias,
  registerSuperProperty, registerSuperProperties, getSuperProperty, getSuperProperties,
  unRegisterSuperProperty,
  clearSuperProperties,
  getPresetProperties,
  identify,
  getDistinctId,
  pageProperty
} from './module/methods/index'
import autoTrigger from './module/autoTrigger'


class ArkWxSdk {
  constructor () {
    coreInit()
  }
  config: initConfig = config;
  pageView = ready(pageView);
  share = share;
  registerSuperProperty = ready(registerSuperProperty);
  registerSuperProperties = ready(registerSuperProperties);
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
  track = ready(track);
  timeEvent = timeEvent;
  alias = ready(alias);
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

// 自动触发生命周期相关钩子
autoTrigger()

export default ArkSdk