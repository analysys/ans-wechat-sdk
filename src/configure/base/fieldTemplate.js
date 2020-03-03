/**
 * SDK 基础字段定义表
 * base.outer：上报日志基础结构定义
 * base.xcontext:上报报文找中xcontext下的共有字段定义
 * $开头的字段为各个事件特殊拥有字段
 */
export default {
    "base": {
        "outer": [
            "appid",
            "xwho",
            "xwhat",
            "xwhen",
            "xcontext"
        ],
        "xcontext": [
            "$lib",
            "$lib_version",
            "$platform",
            "$debug",
            "$is_login",
        ]
    },
    "$startup": {
        "xcontext": [
            "$brand",
            "$model",
            "$os",
            "$os_version",
            "$browser",
            "$browser_version",
            "$network",
            "$screen_width",
            "$screen_height",
            "$utm_campaign_id",
            "$utm_campaign",
            "$utm_medium",
            "$utm_source",
            "$utm_content",
            "$utm_term",
            "$is_first_day",
            "$time_zone",
            "$language",
            "$session_id",
            "$is_time_calibrated",
            "$is_first_time",   //首次访问，只在startUp
            "$referrer",
            "$scene"
        ]
    },
    "$track": {
        "xcontext": [
            "$brand",
            "$model",
            "$os",
            "$os_version",
            "$browser",
            "$browser_version",
            "$network",
            "$screen_width",
            "$screen_height",
            "$utm_campaign_id",
            "$utm_campaign",
            "$utm_medium",
            "$utm_source",
            "$utm_content",
            "$utm_term",
            "$is_first_day",
            "$time_zone",
            "$language",
            "$session_id",
            "$is_time_calibrated"
        ]
    },
    "$pageview": {
        "xcontext": [
            "$brand",
            "$model",
            "$os",
            "$os_version",
            "$browser",
            "$browser_version",
            "$network",
            "$screen_width",
            "$screen_height",
            "$utm_campaign_id",
            "$utm_campaign",
            "$utm_medium",
            "$utm_source",
            "$utm_content",
            "$utm_term",
            "$is_first_day",
            "$time_zone",
            "$language",
            "$session_id",
            "$is_time_calibrated",
            "$referrer",
            "$scene",
            "$startup_time",  // 此行下面5个只在 pageView 中有 
            "$url",
            "$share_id",
            "$share_path",
            "$share_level"
        ]
    },
    "$alias": {
        "xcontext": [
            "$original_id",   //这个不是招商银行特有
        ]
    },
    "$getPresetProperties": {
        "xcontext": [
            "$time_zone",
            "$language",
            "$screen_width",
            "$screen_height",
            "$network",
            "$first_visit_time",
            "$brand",
            "$model",
            "$os",
            "$session_id"
        ]
    }
}