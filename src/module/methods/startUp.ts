import sendData from '../sendData'
import fillData from '../fillData'
import {core, getSuperProperty, setCoreParam } from '../../store/core'
import { profileSetOnce } from './profile'
import { config } from '../../store/config'
import { eventAttribute } from '../../store/eventAttribute'
import { dateFormat } from '../../utils/date'
import lifecycleHook from '../../store/lifecycleHook'

function startUp(...args: any[]) {

  // 获取上报数据模型
  const res = fillData('$startup')

  // 记录启动时间
  eventAttribute.startup.xwhen = res.xwhen

  // 设置首次启动时间
  if (!core.ARKFRISTPROFILE) {
    setCoreParam('ARKFRISTPROFILE', dateFormat(new Date(res.xwhen), 'yyyy-MM-dd hh:mm:ss.SSS'))
  }

  // 合并通用属性
  res.xcontext = Object.assign({}, res.xcontext, getSuperProperty())

  // 初始化完成后首次发送预制启动事件之前，触发生命周期钩子
  if (args.length === 2 && args[1] === 'onShow') {
    lifecycleHook.onBeforeStartUp(res)
  }

  sendData(res, () => {
    // 初始化完成后首次发送预制启动事件成功后，触发生命周期钩子
    lifecycleHook.onAfterStartUp(res)
  })

  // 是否已发送首次用户属性，没有则发送
  if (config.autoProfile && !core.ARKFRISTPROFILESEND) {
    profileSetOnce()
    setCoreParam('ARKFRISTPROFILESEND', true)
  }
}

export default startUp