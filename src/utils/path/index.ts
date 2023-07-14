
import { pathParams } from "../../store/pathParams"

/**
 * 获取当前页面实例
 * @returns 
 */
 export function getCurrentPage() {
  const pathArray = getCurrentPages()
  if (pathArray && pathArray.length) {
    return pathArray[pathArray.length - 1]
  }
  return {}
}


/**
 * 获取当前url路径
 * @param isQuery 是否获取参数
 * @returns 
 */
export function getPath(isQuery?: boolean): string {
  const pages = getCurrentPages()

  if (pages.length) {
    const self = pages[pages.length - 1]
    const path = self.route
    if (isQuery) {
      const options = self.options
      const optionArr = Object.keys(options)
      if (optionArr.length) {
        let parameter = ''
        optionArr.forEach((o, i)=> {
          if (i) {
            parameter += '&'
          }
          parameter += o + '=' + options[o]
        })
        return path + '?' + parameter
      }
    }
    return path
  }
  return ''
}


export function getReferer() {
  const pathArray = getCurrentPages()
  
  if (pathArray && pathArray.length) {
    const self = pathArray[pathArray.length - 2]
    if (self) {
      return self.route
    }
  }
  return pathParams.scene + ''
}