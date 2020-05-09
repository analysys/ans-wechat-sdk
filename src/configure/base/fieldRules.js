/**
 * 字段填充、字段校验规则模板
 * 
 * ReservedKeywords：不可覆盖字段集合
 * 
 * valueType：获取字段值的方式 0：函数获取  1：默认值  
 *
 * value：根据valueType规则填充字段对应取值
 *
 * checkList：数据合法检测方法列表，每个方法返回bool值，以用户为准，同名覆盖
 * 
 */


import {
    getAppId,
    getUploadURL,
    getId,
    nowDate,
    getXwhat,
    getDebugMode,
    isLogin,
    getLibVersion,
    time_zone,
    getSessionId,
    is_first_time,
    is_first_day,
    getScreenWidth,
    getScreenHeight,
    getOs,
    getBrand,
    getBrower,
    getBrowerVersion,
    getOsVersion,
    getModel,
    getLanguage,
    getNetWork,
    getoriginal_id,
    getUrl,
    timeCalibration,
    getScene,
    getRefferer,
    utm_campaign_id,
    utm_source,
    utm_medium,
    utm_term,
    utm_content,
    utm_campaign,
    share_id,
    share_path,
    share_level,
    first_visit_time,
    getEleContent,
    getEleId,
    getEleType,
    getEleName,
} from '../../lib/fillFiled/getField'


export default {
    "resetKeywords": [
        "appid",
        "$debug",
        "uploadUrl"
    ],
    "uploadURL": {
        "valueType": 0,
        "value": getUploadURL,
        "check": {
            "value": ["isString", "nimLength", "isUrl"],
            "errorCode": '60007',
            "successCode": '20008'
        }
    },
    "appid": {
        "valueType": 0,
        "value": getAppId,
        "check": {
            "value": ["isString", "nimLength"],
            "errorCode": '60006',
            "successCode": '20006'
        }
    },
    "auto": {
        "check": {
            "value": ["isBoolean"],
            "errorCode": '60003',
        }
    },
    "autoProfile": {
        "check": {
            "value": ["isBoolean"],
            "errorCode": '60003',
        }
    },
    "xwho": {
        "valueType": 0,
        "value": getId,
        "check": {
            "value": ["isString", "nimLength"]
        }
    },
    "xwhen": {
        "valueType": 0,
        "value": nowDate
    },

    "xwhat": {
        "valueType": 0,
        "value": getXwhat,
        "check": {
            "value": ["isString", "nimLength"]
        }
    },
    "xcontext": {
        "$lib": {
            "valueType": 1,
            "value": "$LIB"
        },
        "$lib_version": {
            "valueType": 0,
            "value": getLibVersion,
            "check": {
                "value": ["isString"],
                "successCode": '20007'
            }
        },
        "$platform": {
            "valueType": 1,
            "value": "$LIB"
        },
        "$debug": {
            "valueType": 0,
            "value": getDebugMode,
            "check": {
                "value": ["isNumber", "isDebug"]
            }
        },
        "$is_login": {
            "valueType": 0,
            "value": isLogin,
            "check": {
                "value": ["isBoolean"]
            }
        },
        "$screen_width": {
            "valueType": 0,
            "value": getScreenWidth,
            "check": {
                "value": ["isNumber"]
            }
        },
        "$screen_height": {
            "valueType": 0,
            "value": getScreenHeight,
            "check": {
                "value": ["isNumber"]
            }
        },
        "$time_zone": {
            "valueType": 1,
            "value": time_zone
        },
        "$os": {
            "valueType": 0,
            "value": getOs,
            "check": {
                "value": ["isString"]
            }
        },
        "$browser": {
            "valueType": 0,
            "value": getBrower
        },
        "$brand": {
            "valueType": 0,
            "value": getBrand,
            "check": {
                "value": ["isString"]
            }
        },
        "$browser_version": {
            "valueType": 0,
            "value": getBrowerVersion,
            "check": {
                "value": ["isString"]
            }
        },
        "$os_version": {
            "valueType": 0,
            "value": getOsVersion,
            "check": {
                "value": ["isString"]
            }
        },
        "$model": {
            "valueType": 0,
            "value": getModel,
            "check": {
                "value": ["isString"]
            }
        },
        "$language": {
            "valueType": 0,
            "value": getLanguage,
            "check": {
                "value": ["isString"]
            }
        },
        "$network": {
            "valueType": 0,
            "value": getNetWork,
            "check": {
                "value": ["isString"]
            }
        },
        "$session_id": {
            "valueType": 0,
            "value": getSessionId
        },
        "$scene": {
            "valueType": 0,
            "value": getScene
        },
        "$referrer": {
            "valueType": 0,
            "value": getRefferer
        },
        "$startup_time": {
            "valueType": 0,
            "value": first_visit_time
        },
        "$is_first_time": {
            "valueType": 0,
            "value": is_first_time
        },
        "$is_first_day": {
            "valueType": 0,
            "value": is_first_day
        },
        "$first_visit_time": {
            "valueType": 0,
            "value": first_visit_time
        },
        "$original_id": {
            "valueType": 0,
            "value": getoriginal_id,
            "check": {
                "value": ["isString"]
            }
        },
        "$is_time_calibrated": {
            "valueType": 0,
            "value": timeCalibration
        },
        "$url": {
            "valueType": 0,
            "value": getUrl
        },
        // utm 相关
        "$utm_campaign_id": {
            "valueType": 0,
            "value": utm_campaign_id
        },
        "$utm_source": {
            "valueType": 0,
            "value": utm_source
        },
        "$utm_medium": {
            "valueType": 0,
            "value": utm_medium
        },
        "$utm_term": {
            "valueType": 0,
            "value": utm_term
        },
        "$utm_content": {
            "valueType": 0,
            "value": utm_content
        },
        "$utm_campaign": {
            "valueType": 0,
            "value": utm_campaign
        },
        "$share_id": {
            "valueType": 0,
            "value": share_id
        },
        "$share_level": {
            "valueType": 0,
            "value": share_level
        },
        "$share_path": {
            "valueType": 0,
            "value": share_path
        },
        "$element_content": {
            "valueType": 0,
            "value": getEleContent
        },
        "$element_id": {
            "valueType": 0,
            "value": getEleId
        },
        "$element_type": {
            "valueType": 0,
            "value": getEleType
        },
        "$element_name": {
            "valueType": 0,
            "value": getEleName
        }
    },
    "xcontextCommonRule": {
        "check": {
            "key": ["isString", "length99", "notSpecialCharacters", "keywords"],
            "value": ["notObject", "isArrayString", "length255"],
        }
    },
    "$track": {
        "check": {
            "key": ["isString", "notSpecialCharacters", "length99"]
        }
    },
    "$alias": {
        "check": {
            "key": ["isString", "keyLength255"]
        }
    },
    "$profile_increment": {
        "check": {
            "key": ["isString", "length99", "notSpecialCharacters"],
            "value": ["isNumber"],
        }
    },
    "$profile_unset": {
        "check": {
            "key": ["isString", "length99", "notSpecialCharacters"]
        }
    },
    "$pageview": {
        "check": {
            "key": ["isString", "keyLength255"]
        }
    }
}