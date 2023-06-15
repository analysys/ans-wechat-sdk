import { $lib, $lib_version } from "../../constant"
import { config } from "../../store/config"
import { core, getId, getSessionId } from "../../store/core"
import { getNow, timeDiff } from '../../store/time'
import { network } from "../../store/network"
import { system } from "../../store/system"
import { getPath, getReferer } from '../../utils/path'
import { pathParams } from '../../store/pathParams'
import { clientTimeZone } from '../../utils/date'
import { valToString, valToNumber } from "../../utils/type/transform"
import { dateFormat } from "../../utils/date"
import { userClickAttrs } from "../../store/clickElement"

/**
 * 获取属性值
 */

export default {
  xwho () : string {
    return getId()
  },
  xwhen () : number {
    return getNow()
  },
  xwhat (xwhat : string) : string {
    return xwhat
  },
  $lib () : string {
    return $lib
  },
  $lib_version () : string {
    return $lib_version
  },
  $platform() : string {
    return $lib
  },
  $debug () : number {
    return config.debugMode
  },
  $is_login () : boolean {
    return !!core.ARK_LOGINID
  },

  $session_id () {
    return getSessionId()
  },

  $screen_width (): number {
    return system.screenWidth
  },
  $screen_height (): number {
    return system.screenHeight
  },
  
  $os (): string {
    const os = system.system
    return os ? os.split(' ')[0] : ''
  },
  $browser (): string {
    return ''
  },
  $brand () : string {
    return system.brand
  },
  $browser_version (): string {
    return system.version
  },
  $os_version (): string {
    return system.system ? system.system.split(' ')[1] : ''
  },
  $model (): number {
    return system.model
  },
  $language (): string {
    return system.language
  },
  
  $network (): string {
    return network.networkType
  },
  
  $time_zone () {
    return 'GMT' + clientTimeZone()
  },
  $startup_time () {
    return ''
  },

   // 是否安装后首次访问
  $is_first_time () {
    return !core.ARKFRISTPROFILE
  },

  // 是否安装后首日访问
  $is_first_day () {
    const datetime = core.ARKFRISTPROFILE
    if (!datetime) {
      return true
    }
    return dateFormat(new Date(getNow()), 'yyyyMMdd') === dateFormat(new Date(datetime), 'yyyyMMdd')
  },
  $first_visit_time () {
    return core.ARKFRISTPROFILE
  },
  $first_visit_language () {
    return system.language
  },
  $original_id () {
    return core.ARK_TRACKID || core.ARK_ID
  },

  // 是否校准了时间
  $is_time_calibrated (): boolean {
    return config.allowTimeCheck && timeDiff ? true : false
  },

  // url 相关
  $scene (): string {
    return pathParams.scene.toString()
  },
  $referrer (): string {
    return getReferer()
  },
  $url(): string {
    return getPath(config.autoCompleteURL)
  },
  $url_path(): string {
    return getPath()
  },

  // 页面URL-去参的页面URL
  $url_domain(): string {
    return getPath()
  },

  $utm_campaign_id (): string {
    return pathParams.utm_campaign_id
  },
  $utm_source (): string {
    return pathParams.utm_source
  },
  $utm_medium (): string {
    return pathParams.utm_medium
  },
  $utm_term (): string {
    return pathParams.utm_term
  },
  $utm_content (): string {
    return pathParams.utm_content
  },
  $utm_campaign (): string {
    return pathParams.utm_campaign
  },


  $share_id () {
    return pathParams.share_id
  },
  $share_level () : number | '' {
    return valToNumber(pathParams.share_level)
  },
  $share_path () {
    return pathParams.share_path
  },

  // 点击元素相关
  $element_content (): string {
    return valToString(userClickAttrs.element_content)
  },
  $element_id () : string {
    return valToString(userClickAttrs.element_id)
  },
  $element_type () : string {
    return valToString(userClickAttrs.element_type)
  },
  $element_function () : string {
    return valToString(userClickAttrs.element_function)
  },
  $element_name () : string {
    return valToString(userClickAttrs.element_name)
  },

  $appid () : string {
    return config.$appid
  },
  $appname () : string {
    return config.$appname
  }
  
}






