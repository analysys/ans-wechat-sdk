
import { globalWindow } from '../../constant/index'
import { getCore } from '../../store/core'

export const setStorage = function (key = 'FZ_STROAGE', data: any = getCore()) {
  globalWindow.setStorageSync(key, data)
}

export const getStorage = function (key = 'FZ_STROAGE') {
  return globalWindow.getStorageSync(key)
}