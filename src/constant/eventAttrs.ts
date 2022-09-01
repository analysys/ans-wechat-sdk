
// 只读属性，无法被更改
export const readOnlyAttrs = ['$lib', '$lib_version', '$platform', '$first_visit_time', '$debug', '$is_login']

// 公共预制属性，任何事件上报都会带上这些属性
export const publicAttrs: string[] = [
  '$appid',
  '$appname',
  '$lib',
  '$lib_version',
  '$platform',
  '$is_login',
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
  '$debug',
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
    ...utmAttrs,
    '$is_first_day',
    '$is_first_time', //首次访问，只在startUp
    '$scene'
  ],
  $end: [
    '$duration' //使用时长
  ],
  $pageview: [
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
    '$url',
    '$referrer',
    '$url_domain',
    'pagestaytime'
  ],
  $alias: [
    '$original_id'
  ],
  $share: [],
  $getPresetProperties: [
    '$first_visit_time'
  ],
  $user_click: [
    '$element_content',
    '$element_id',
    '$element_type',
    '$element_name',
    '$element_function',
    '$url',
    '$url_path',
    '$is_first_day'
  ],
  $profile_set_once: [
    '$first_visit_time',
    '$first_visit_language'
  ]
}