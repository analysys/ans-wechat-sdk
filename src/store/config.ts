
import { initConfig } from '../types'
import { optionsDefault } from '../constant'
import { isBoolean, isNumber, isString } from '../utils/type'
import { lengthCheck } from '../utils/verify'
import { errorLog } from '../module/printLog'
import { coreInit } from './core'
import { implementAallbackArr } from '../module/ready'
import { setNetwork } from './network'
import { getServerTime } from './time'

const configRule = {
  appkey: {
    verify: [lengthCheck]
  },
  uploadURL: {
    verify: [lengthCheck]
  },
  debugMode: {
    verify: [isNumber]
  },
  autoStartUp: {
    verify: [isBoolean]
  },
  autoEnd: {
    verify: [isBoolean]
  },
  auto: {
    verify: [isBoolean]
  },
  autoProfile: {
    verify: [isBoolean]
  },
  encryptType: {
    verify: [isNumber]
  },
  autoShare: {
    verify: [isBoolean]
  },
  allowTimeCheck: {
    verify: [isBoolean]
  },
  maxDiffTimeInterval: {
    verify: [isNumber, function (value){
      if (value <= 0) {
        return false
      }
      return true
    }]
  },
  autoTrack: {
    verify: [isBoolean]
  },
  autoCompleteURL: {
    verify: [isBoolean]
  },
  autoPageViewDuration: {
    verify: [isBoolean]
  },
  sendDataTimeout: {
    verify: [isNumber],
  },
  $appname: {
    verify: [isString]
  },
  $appid: {
    verify: [isString]
  }
}


export const config : initConfig = optionsDefault()

export function setConfig (options: initConfig, isVerify = true) : Promise<object> {
  return new Promise((resolve, reject) => {
    if (isVerify) {
      const optionArr = Object.keys(options)
      optionArr.forEach(o => {
        const rule = configRule[o]
        if (rule && rule.verify.length) {
          const value = options[o]
          let isOk = true
          for (let i = 0; i < rule.verify.length; i++) {
            const fn = rule.verify[i]
            if (!fn(value)) {
              isOk = false
              break
            }
          }
          if (!isOk) {
            errorLog({
              key: o,
              code: 60002,
              value: value
            }, true)
          } else {
            config[o] = value
          }
        }
      })
    }

    coreInit()
    
    
    Promise.all([setNetwork(), getServerTime()]).then(() => {
      implementAallbackArr()
      resolve(config)
    })
  })
}

export function getConfig (): object {
  return config
}