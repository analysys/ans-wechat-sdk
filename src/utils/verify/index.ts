
import { isString, isArray, isNumber, isBoolean, isObject } from "../type"
import { errorLog } from '../../module/printLog/index'
import { msgetype } from '../../types'
import { readOnlyAttrs } from '../../constant/eventAttrs'

/**
 * 长度校验
 * @param value 
 * @param max 
 * @param min
 * @returns 
 */

export function lengthCheck(value: string, max  = 255, min  = 1): boolean {
  if (!isString(value)) {
    return false
  }
  const len = value.length
  return len < max && len >= min
}

/**
 * 自定义属性key校验
 * @param value 
 * @param eventName 
 * @returns 
 */

export function attrNameCheck (value: string, logObj?: msgetype): boolean {
  let state = true
  if (!lengthCheck(value, 99)) {
    state = false
  } else if (readOnlyAttrs.indexOf(value) > -1){
    state = false
    if (logObj) {
      logObj.code = 600012
    }
  } else {
    state = /^[$a-zA-Z][a-zA-Z0-9_$]{0,}$/.test(value)
  }
  if (logObj && logObj.fn && !state) {
    errorLog(logObj)
  }
  return state
}

/**
 * 自定义属性值校验
 * @param value 
 */
export function attrValueCheck (value: any, logObj?: msgetype): boolean {

  let state = false

  if (isString(value) || isNumber(value) || isArray(value) || isBoolean(value)) {
    state = true
    if (isString(value)) {
      if (!lengthCheck(value, 255)) {
        state = false
      }
    } else if (isArray(value)) {
      const some = value.some(o => lengthCheck(o, 255))
      state = some
    }
  }

  if (logObj && logObj.fn && logObj.key && !state) {
    errorLog(logObj)
  }

  return state
}

/**
 * 属性校验，不通过的提示并删除
 * @param value 
 * @param eventName 事件名称, 如果存在则抛出错误提示
 */
export function attrCheck (value: any, eventName?: string): object {

  const arrs = {}
  if (value) {
    if (!isObject(value)) {
      errorLog({
        code: 600016,
        fn: eventName,
        value: value
      })
      return {}
    }

    for (const key in value) {
      const item = value[key]
      if (attrNameCheck(key, {code: 600023, fn: eventName, key: key}) && attrValueCheck(item, {code: 600022, fn: eventName, key: key, value: item})) {
        arrs[key] = item
      }
    }
    
  }
  return arrs
}