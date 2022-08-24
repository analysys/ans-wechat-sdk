
import { buriedPointData } from '../types'
import { $ans } from '../constant/index'
import { setStorage, getStorage } from '../utils/storage'
import MD5 from '../utils/md5'
import { setSystem } from './system'

export interface coreInterface {

  // 数据上报的appkey
  ARKAPPID: string;

  // 调试模式
  ARKDEBUG: number;

  // 上报地址
  ARKUPLOADURL: string;

  // 首次启动时间
  ARKFRISTPROFILE: string;

  // 是否已发送首次用户属性
  ARKFRISTPROFILESEND: boolean;

  // 超级属性
  ARKSUPER: object;

  ARK_ID: string; // 系统生成的匿名id
  ARK_TRACKID?: string; // 手动设置的匿名id
  ARK_LOGINID?: string; // 登录后设置的id

  // 首次访问时间
  FRISTDAY: number | string;

  // 缓存上报的数据
  POSTDATA?: Array<buriedPointData>;

  SEESIONDATE: number;
  SEESIONID: string;
}

/**
 * 返回核心数据默认值
 * @returns object
 */
export function coreDefault() : coreInterface  {
  return {
    ARKAPPID: '',
    ARKDEBUG: 0,
    ARKUPLOADURL: '',
    ARKFRISTPROFILE: '',
    ARKFRISTPROFILESEND: false,
    ARKSUPER: {},
    ARK_ID: setId(),
    FRISTDAY: 0,
    POSTDATA: [],
    SEESIONDATE: 0,
    SEESIONID: ''
  }
}

export let core : coreInterface

/**
 * 初始化
 */
export function coreInit () {
  let storageCore = getStorage()
  if (!storageCore) {
    storageCore = coreDefault()
    core = storageCore
    setStorage()
  } else {
    core = storageCore
  }

  // 设置设备相关信息
  setSystem()
}

export function getCore () : coreInterface {
  return core
}

// 重置缓存数据
export function resetCore () {
  core.ARK_ID = setId()
  core.ARK_TRACKID = ''
  core.ARK_LOGINID = ''
  core.ARKSUPER = {}
  core.ARKFRISTPROFILE = ''
  core.ARKFRISTPROFILESEND = false
  setSessionId()
}

/**
 * 设置参数
 */
export function setCoreParam (key, value) {
  core[key] = value
  setStorage()
}

/**
 * 设置多个参数
 */
export function setCoreParams (obj : object) {
  Object.keys(obj).forEach(o => {
    if (core[o] !== undefined) {
      core[o] = obj[o]
    }
  })
  setStorage()
}

/**
 * 获取当前用户id
 * 优先获取登录后id => 用户自定义匿名id => 系统生成匿名id
 */
export function getId () : string {
  return core.ARK_LOGINID || core.ARK_TRACKID || core.ARK_ID
}

/**
 * 系统设置匿名id
 * @returns 
 */
export function setId() : string {
  const timeRandom = new Date().getTime() + '' + Math.random() * 10000
  return $ans + MD5(timeRandom, 32) + MD5(timeRandom, 32).slice(0, 4)
}


/**
 * 获取sessionId
 */
export function getSessionId (): string {
  const date = new Date()
  const nowDate = date.getTime()
  const offset_GMT = date.getTimezoneOffset()
  const nowDay = new Date(nowDate + offset_GMT * 60 * 1000 + 8 * 60 * 60 * 1000).getDate()
  const sessionDay = !core.SEESIONDATE ? 0 : new Date(core.SEESIONDATE + offset_GMT * 60 * 1000 + 8 * 60 * 60 * 1000).getDate()
  if (!core.SEESIONID || !core.SEESIONDATE || (nowDate - core.SEESIONDATE > 30 * 60 * 1000) || sessionDay !== nowDay) {
    setSessionId()
  }
  return core.SEESIONID
}

/**
 * 设置sessionid
 */
export function setSessionId () {
  const date = +new Date()
  core.SEESIONDATE = date
  core.SEESIONID = MD5($ans + date + '' + Math.random(), 16)
  setStorage()
}

/**
 * 用户手动设置匿名id
 * @param xwho 
 */
export function setAnonymousID (xwho: string) {
  core.ARK_TRACKID = xwho
  setStorage()
}

/**
 * 获取用户通过identify接口设置或自动生成的id，优先级如下： 用户设置的id > 代码自动生成的id
 */
export function getAnonymousID () {
  return core.ARK_TRACKID || core.ARK_ID
}

// 通用属性

/**
 * 获取指定通用属性或全部通用属性
 * @param superPropertyName 属性名称
 * @returns 
 */
export function getSuperProperty(superPropertyName?: string) {
  if (superPropertyName) {
    return core.ARKSUPER[superPropertyName]
  }
  return core.ARKSUPER
}

/**
 * 设置通用属性
 * @param property 属性
 */
export function setSuperProperty(property: object) {
  core.ARKSUPER = Object.assign({}, core.ARKSUPER, property)
  setStorage()
}
/**
 * 删除指定通用属性或全部通用属性
 * @param superPropertyName 属性名称
 */
export function delSuperProperty(superPropertyName?: string) {

  // 删除指定属性
  if (superPropertyName && core.ARKSUPER[superPropertyName]) {
    delete core.ARKSUPER[superPropertyName]
  }

  // 删除全部
  if (superPropertyName === undefined) {
    core.ARKSUPER = {}
  }
  setStorage()
}


// 添加上报数据
export function addPostData (option : buriedPointData) {
  if (!core.POSTDATA) {
    core.POSTDATA = []
  }
  if (core.POSTDATA.length < 500) {
    core.POSTDATA.push(option)
    setStorage()
  }
}

// 删除上报数据
export function delPostData (arrData: Array<buriedPointData>) {
  const arrDataMap = {}
  arrData.forEach(o => {
    arrDataMap[o.xwhen] = 1
  })

  for (let i = core.POSTDATA.length - 1; i >= 0; i--) {
    const item = core.POSTDATA[i]
    if (arrDataMap[item.xwhen]) {
      core.POSTDATA.splice(i, 1)
    }
  }
  setStorage()
}

// 获取上报数据
export function getPostData () : Array<buriedPointData> {
  return [...core.POSTDATA]
}