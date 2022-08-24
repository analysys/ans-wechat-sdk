
/**
 * 设备信息
 */

import { globalWindow } from '../constant/index'

interface systemValue {
  brand: string;
  model?: number;
  pixelRatio?: number;
  screenWidth: number;
  screenHeight: number;
  language: string;
  version: string;
  system: string;
  platform: string;
  fontSizeSetting: string;
  SDKVersion: string;
  benchmarkLevel?: number;
  deviceOrientation: string;
}

let system : systemValue

function getSystem (): object {
  return system
}

function setSystem(): Promise<object> {
  return new Promise((resolve, reject) => {
    globalWindow.getSystemInfo({
      success(res) {
        system = res
        resolve(res)
      }
    })
  })
}

export {system, getSystem, setSystem}