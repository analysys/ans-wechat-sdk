/**
 * 网络信息
 */

import { globalWindow } from '../constant/index'

interface networkValue {
  networkType: string;
  signalStrength?: number;
  hasSystemProxy?: boolean;
}

let network: networkValue = {
  networkType: ''
}

// 是否已获取过netWork

let isGetNetWork = false

/**
 * 返回网络信息
 * @param cache boolean 是否读取缓存
 * @returns 
 */

function getNetwork (cache  = true) : Promise<any> {
  return new Promise((resolve, reject) => {
    if (!cache || !network.networkType) {
      setNetwork().then(res => {
        resolve(network)
      })
    } else {
      resolve(network)
    }
  })
}

function setNetwork() : Promise<any> {
  return new Promise((resolve, reject) => {
    globalWindow.getNetworkType({
      success(res) {
        network = res
        isGetNetWork = true
        resolve(res)
      },
      fail () {
        isGetNetWork = true
        resolve(network)
      }
    })
  })
}

function hasNetwork () : boolean {
  return !network.networkType ? false : true
}

export { network, getNetwork, setNetwork, hasNetwork, isGetNetWork }