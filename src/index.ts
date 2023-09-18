/**
 * 小程序标准版sdk
 */

import { initConfig } from './types'
import { setConfig, config } from './store/config'
import { globalWindow, optionsDefault, $lib_version } from './constant/index'
import ready, { implementAallbackArr } from './module/ready'
import { successLog, errorMessage } from './module/printLog/index'
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
import { setNetwork } from './store/network'
import { getServerTime } from './store/time'


class ArkWxSdk {
  constructor () {
    Promise.all([setNetwork(), getServerTime()]).then(() => {
      implementAallbackArr()
    })
  }
  version: string = $lib_version;
  config: initConfig = config;
  pageView = ready(pageView);
  share = ready(share);
  registerSuperProperty = ready(registerSuperProperty, true);
  registerSuperProperties = ready(registerSuperProperties, true);
  getSuperProperty = ready(getSuperProperty);
  getSuperProperties = ready(getSuperProperties);
  unRegisterSuperProperty = ready(unRegisterSuperProperty);
  clearSuperProperties = ready(clearSuperProperties);
  profileSetOnce = ready(profileSetOnce);
  profileSet = ready(profileSet);
  profileAppend = ready(profileAppend);
  profileIncrement = ready(profileIncrement);
  profileDelete = ready(profileDelete);
  profileUnset = ready(profileUnset);
  reset = ready(reset);
  track = ready(track);
  timeEvent = timeEvent;
  alias = ready(alias);
  getPresetProperties = ready(getPresetProperties);
  identify = ready(identify, true);
  getDistinctId = ready(getDistinctId);
  pageProperty = ready(pageProperty);

  // 初始化传入配置
  init (config: initConfig) {
    if (!config.appkey) throw new Error(errorMessage['60006']) 
    if (!config.uploadURL) throw new Error(errorMessage['60007'])
    setConfig(config).then(o => {
      this.config = o
      successLog({
        code: 20007
      })
      implementAallbackArr()
    })
  }
}

// 初始化传入配置
Object.defineProperty(ArkWxSdk.prototype, 'appKey', {
  set: function set() {
    throw new Error('请使用init方法初始化sdk') 
  },
  enumerable: false,
  configurable: true
})

const ArkSdk = new ArkWxSdk()
globalWindow.AnalysysAgent = ArkSdk

// 自动触发生命周期相关钩子
autoTrigger()

export default ArkSdk