const firstVisitTime = '$first_visit_time'

// 只读属性，无法被更改
export const readOnlyAttrs = ['$lib', '$lib_version', '$platform', firstVisitTime, '$debug', '$is_login']

// 公共预制属性，任何事件上报都会带上这些属性
export const publicAttrs: string[] = [
  '$appid',
  '$appname',
  '$lib',
  '$lib_version',
  '$platform',
  '$is_login',
  '$debug'
]

// 行为事件上报会带上这部分属性
export const actionEventAttrs = [
  '$brand',
  '$model',
  '$os',
  '$os_version',
  '$browser',
  '$browser_version',
  '$network',
  '$screen_width',
  '$screen_height',
  '$language',
  '$time_zone',
  '$session_id',
  '$is_time_calibrated'
]

// utm相关属性
export const utmAttrs: string[] = [
  '$utm_campaign_id',
  '$utm_campaign',
  '$utm_medium',
  '$utm_source',
  '$utm_content',
  '$utm_term'
]

// 预制事件列表与事件属性
export const events = {
  $startup: [
    ...actionEventAttrs,
    ...utmAttrs,
    '$is_first_day', //是否安装后首日访问
    '$is_first_time', //是否安装后首次访问，只在startUp
    '$scene'
  ],
  $end: [
    ...actionEventAttrs,
    '$duration', //使用时长
    '$is_first_day'
  ],
  $pageview: [
    ...actionEventAttrs,
    ...utmAttrs,
    '$is_first_day',
    '$referrer',
    '$scene',
    '$startup_time', // 此行下面5个只在 pageView 中有
    '$url',
    '$url_domain',
    '$share_id',
    '$share_path',
    '$share_level'
  ],
  page_close: [
    ...actionEventAttrs,
    '$url',
    '$referrer',
    '$url_domain',
    'pagestaytime'
  ],
  $alias: [
    '$original_id'
  ],
  $share: actionEventAttrs,
  $user_click: [
    ...actionEventAttrs,
    '$element_content',
    '$element_id',
    '$element_type',
    '$element_name',
    '$element_function',
    '$url',
    '$url_path',
    '$is_first_day'
  ],
  track: actionEventAttrs,
  $getPresetProperties: [
    ...actionEventAttrs,
    firstVisitTime
  ],
  $profile_set_once: [
    firstVisitTime,
    '$first_visit_language'
  ]
}