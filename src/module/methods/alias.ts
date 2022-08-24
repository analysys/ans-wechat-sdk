import sendData from '../sendData'
import fillData from '../fillData'
import { lengthCheck } from '../../utils/verify/index'
import { config } from '../../store/config'
import { profileSetOnce } from './profile'
import { setCoreParam } from '../../store/core'
import { successLog, errorLog } from '../printLog'
import { addPostData } from '../../store/core'

function alias (aliasId: string) {

  // 验证id是否符合格式
  if (!lengthCheck(aliasId)) {
    errorLog({
      code: 60005,
      value: aliasId,
      fn: 'alias'
    })
    return false
  }

  // 设置登录后id
  setCoreParam('ARK_LOGINID', aliasId)

  successLog({
    code: 20014
  })

  // 获取上报数据模块
  const res = fillData('$alias')

  // 是否设置自动采集
  if (config.autoProfile === true) {
    addPostData(res)
    profileSetOnce()
  } else {
    sendData(res)
  }
}

export default alias