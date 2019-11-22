import fieldTemplate from '../../configure/base/fieldTemplate.js'
export default {
    "base": {
        "appid": "",
        "$debug": 0,
        "$lib_version": "4.3.0",
        "$lib": "WeChat",
        "uploadURL": "",
        "auto": true,
        "autoProfile": true,
        "encryptType": 0,
        "autoShare": false,
        "$share_level": "",
        "$share_path": "",
        "$share_id": "",
        "appProperty": null,
        "allowTimeCheck": false,
        "maxDiffTimeInterval": 30,
        "logflag": false
    },
    "status": {
        "code": 200,
        "FnName": "",
        "key": "",
        "value": "",
        "errorCode": "",
        "successCode": ""
    },
    "system": {
        "system": null,
        "netWork": null,
        "scene": null
    },
    "isStartUp": false,
    "FnCatch": [],
    "FnSuperCatch": [],
    "keywords": fieldTemplate.base.xcontext,
    "baseJson": fieldTemplate.base.outer,
    "sendNum": 1800
}