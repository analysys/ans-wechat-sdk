import { initConfig } from '../types'

export const $lib = '$LIB'
export const $lib_version = '$LibVERSION'
export const $ans = '$ANS'


export const globalWindow = wx as any;

// sdk配置参数默认值
export function optionsDefault() : initConfig {
  return {
    appkey: '',
    uploadURL: '',
    debugMode: 0,
    auto: true,
    autoProfile: true,
    encryptType: 0,
    autoShare: false,
    allowTimeCheck: false,
    maxDiffTimeInterval: 30,
    autoTrack: false,
    autoCompleteURL: true,
    autoPageViewDuration: false,
    sendDataTimeout: 10000,
    $appid: '',
    $appname: ''
  }
}