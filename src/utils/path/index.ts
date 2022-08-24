
import { pathParams } from "../../store/pathParams"

/**
 * 获取当前url路径
 * @param isQuery 是否获取参数
 * @returns 
 */
export function getPath(isQuery?: boolean): string {

  const pathArray = getCurrentPages()

  if (pathArray && pathArray.length) {
    const self = pathArray[pathArray.length - 1]
    const path = self.route
    const options = self.options
    const optionArr = Object.keys(options)

    // 组件完整 URL
    if (optionArr.length && isQuery ) {
      let parameter = ''
      optionArr.forEach((o, i)=> {
        i && (parameter += '&')
        parameter += o + '=' + options[o]
      })
      return path + '?' + parameter
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