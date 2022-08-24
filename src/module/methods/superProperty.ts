
import { successLog } from '../printLog'
import { attrCheck, attrNameCheck } from '../../utils/verify'
import { setSuperProperty, getSuperProperty as getSuperAttrs, delSuperProperty } from '../../store/core'
 

function setAttrs (superProperty, methodName) {
  const attrs = attrCheck(superProperty, methodName)
  if (Object.keys(attrs).length) {
    setSuperProperty(attrs)
    successLog({
      fn: methodName,
      code: 20002,
      value: superProperty
    })
  }
}

/**
 * 设置单个通用属性
 * @param name string
 * @param value string  number  boolean Array<string>
 */
export function registerSuperProperty (name: string, value: string | number | boolean | Array<string>) {
  const methodName = '$registerSuperProperty'
  if (attrNameCheck(name, {code: 600023, fn: methodName, key: name})) {
    const obj = {
      [name]: value
    }
    setAttrs(obj, methodName)
  }
}

/**
 * 设置多个属性
 * @param superProperty 属性
 * @returns 
 */
export function registerSuperProperties (superProperty: object) {
  setAttrs(superProperty, '$registerSuperProperties')
}

/**
 * 获取单个通用属性
 */
export function getSuperProperty (superPropertyName: string) {
  return getSuperAttrs(superPropertyName)
}

/**
 * 获取所有通用属性
 */
export function getSuperProperties () {
  return getSuperAttrs()
}


/**
 * 删除单个属性
 * @param superPropertyName 属性名称
 */
export function unRegisterSuperProperty (superPropertyName: string) {

  delSuperProperty(superPropertyName)

  successLog({
    fn: '$unRegisterSuperProperty',
    code: 20003,
    value: superPropertyName
  })
}

/**
 * 删除所有属性
 */
export function clearSuperProperties () {
  delSuperProperty()
  successLog({
    fn: '$clearSuperProperties',
    code: 20004
  })
}