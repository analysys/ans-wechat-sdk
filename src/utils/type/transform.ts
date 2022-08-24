// 类型转换

import { isObject } from "./index"

/**
 * 值转换成字符串
 */

export function valToString(value: any) : string {
  if (value === undefined || value === null) {
    return ''
  }
  if (isObject(value)) {
    return JSON.stringify(value)
  }
  return value + ''
}


/**
 * 值转换成数字
 * @param value 
 */

export function valToNumber (value: any) : number | '' {
  if (value === undefined || value === null || value === '') {
    return ''
  }
  if (value >= -Infinity) {
    return value - 0
  }
  return ''
}