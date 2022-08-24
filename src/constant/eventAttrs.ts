// 公共预制属性，任何事件上报都会带上这些属性
export const publicAttrs: string[] = [
  '$appid',
  '$appname',
  '$lib',
  '$lib_version',
  '$platform',
  '$debug',
  '$is_login',
  '$brand',
  '$model',
  '$os',
  '$os_version',
  '$browser',
  '$browser_version',
  '$network',
  '$screen_width',
  '$screen_height'
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
  $startup: {
    attrs: [
      ...utmAttrs,
      '$is_first_day',
      '$time_zone',
      '$language',
      '$session_id',
      '$is_time_calibrated',
      '$is_first_time', //首次访问，只在startUp
      '$scene',
    ]
  },
  $end: {
    attrs: [
      '$duration' //使用时长
    ]
  },
  $pageview: {
    attrs: [
      ...utmAttrs,
      '$network',
      '$screen_width',
      '$screen_height',
      '$is_first_day',
      '$time_zone',
      '$language',
      '$session_id',
      '$is_time_calibrated',
      '$referrer',
      '$scene',
      '$startup_time', // 此行下面5个只在 pageView 中有
      '$url',
      '$url_domain',
      '$share_id',
      '$share_path',
      '$share_level',
    ],
  },
  page_close: {
    attrs: [
      '$url',
      '$referrer',
      '$url_domain',
      'pagestaytime'
    ]
  },
  $alias: {
    attrs: [
      '$original_id'
    ]
  },
  $share: {
    attrs: []
  },
  $getPresetProperties: {
    attrs: [
      '$time_zone',
      '$language',
      '$screen_width',
      '$screen_height',
      '$network',
      '$first_visit_time',
      '$os',
      '$session_id',
    ],
  },
  $user_click: {
    attrs: [
      '$element_content',
      '$element_id',
      '$element_type',
      '$element_name',
      '$element_function',
      '$url',
      '$url_path',
      '$is_first_day',
      '$session_id',
      '$is_time_calibrated',
    ],
  },
  $profile_set_once: {
    attrs: [
      '$first_visit_time',
      '$first_visit_language'
    ]
  }
}


// 只读属性，无法被更改
export const readOnlyAttrs = ['$lib', '$lib_version', '$platform', '$first_visit_time', '$debug', '$is_login']