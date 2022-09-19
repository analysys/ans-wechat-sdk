
import { buriedPointData } from '../../types'
import io from '../../utils/requrst'
import { config } from '../../store/config'
import { getPostData, addPostData, delPostData } from '../../store/core'
import { errorLog, successLog } from '../printLog/index'
import { globalWindow } from '../../constant/index'
import { isFunction } from '../../utils/type'

// 一次最多上报20条
const MAXLINENUM = 20

// 上报失败后重试次数
const RETRNUM = 3

// 正在上报数据
let doingList: Array<buriedPointData> = []

// 当前重试次数
let retryCount = 0

// 发送请求
function postData (successFn?: () => void) : any {

  // 待上报数据
  const todoList: Array<buriedPointData> = getPostData()

  if (doingList.length || !todoList.length) {
    return
  }

  // 取出最多 MAXLINENUM 条数据进入上报队列
  doingList = todoList.splice(0, MAXLINENUM)

  let option = {
    url: config.uploadURL + '/up' + '?appid=' + config.appkey,
    data: doingList,
    encryptType: config.encryptType
  }

  successLog({
    key: option.url,
    value: doingList,
    code: 20012
  })

  // 开启调试模式，不入库
  if (config.debugMode === 1) {
    delPostData(doingList)
    doingList = []
    return
  }

  if (globalWindow.AnalysysAgent.encrypt && isFunction(globalWindow.AnalysysAgent.encrypt.uploadData)) {
    option = globalWindow.AnalysysAgent.encrypt.uploadData(option);
  }
  
  // ea 上报数据
  globalWindow.AnalysysModal && globalWindow.AnalysysModal(doingList)
  io({
    url: option.url,
    method: 'POST',
    data: option.data,
    timeout: config.sendDataTimeout
  }).then(res => {
    
    // 上报成功后删除队列与相应的缓存数据
    delPostData(doingList)
    doingList = []

    // 继续上报剩下的数据，如果有的话
    postData()

    successFn && successFn()

    successLog({
      code: 20001
    })

    retryCount = 0

  }).catch(e => {
    doingList = []
    errorLog({
      code: 60008
    })
    // 失败后重试上报，最多重试RETRNUM次
    if (retryCount < RETRNUM) {
      postData()
      retryCount++
    }
  })
}

/**
 * 上报数据
 * @param data object
 */

function sendData (data: buriedPointData, successFn?: () => void) : any {

  // 加入待上报队列
  addPostData(data)

  postData(successFn)
}

export default sendData