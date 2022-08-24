
import { isObject } from '../../utils/type'
import sendData from '../sendData'
import fillData from '../fillData'
import { errorLog } from '../printLog'
import { attrCheck, lengthCheck, attrValueCheck, attrNameCheck } from '../../utils/verify'


function sendProfile (eventName, propertyName, propertyValue) {
  // 获取上报数据模块
  const res = fillData(eventName)

  let property = {}

  if (isObject(propertyName)) {
    property = propertyName
  }

  if (lengthCheck(propertyName) && attrValueCheck(propertyValue)) {
    property[propertyName] = propertyValue
  }

  res.xcontext = Object.assign({}, res.xcontext, attrCheck(property, eventName))
  
  sendData(res)
}

/**
 * 设置用户固有属性
 * @param propertyName 
 * @param propertyValue 
 */
export function profileSetOnce (propertyName?: any, propertyValue?: string | number | Array<string>) {
  sendProfile('$profile_set_once', propertyName, propertyValue)
}


/**
 * 给用户设置单个或多个属性，如果之前不存在，则新建，否则覆盖
 * @param propertyName 
 * @param propertyValue 
 */
export function profileSet (propertyName, propertyValue) {
  sendProfile('$profile_set', propertyName, propertyValue)
}


/**
 * 设置用户属性的相对变化值(相对增加，减少)，只能对数值型属性进行操作，如果这个 Profile之前不存在，则初始值为0。
 * @param propertyName 
 * @param propertyValue 
 */
export function profileIncrement (propertyName, propertyValue) {
  sendProfile('$profile_increment', propertyName, propertyValue)
}


/**
 * 用户列表属性增加元素。
 * @param propertyName 
 * @param propertyValue 
 */
export function profileAppend (propertyName, propertyValue) {
  sendProfile('$profile_append', propertyName, propertyValue)
}

/**
 * 删除当前用户单个属性值
 * @param propertyName 
 */
export function profileUnset (propertyName: string) {

  // 获取上报数据模块
  const res = fillData('$profile_unset')

  if (attrNameCheck(propertyName)) {
    res.xcontext = Object.assign({}, res.xcontext, {
      [propertyName]: ''
    })
  } else {
    errorLog({
      code: 600010,
      fn: 'profileUnset',
      key: propertyName
    })
  }

  sendData(res)
}


/**
 * 删除当前用户所有属性值
 */
export function profileDelete () {

  // 获取上报数据模块
  const res = fillData('$profile_delete')
  sendData(res)
}