import fieldTemplate from '../../configure/base/fieldTemplate.js'
export default {
    "base": {
        "appid": "",
        "$debug": 0,
        "$lib_version": "$LibVERSION",
        "$lib": "$LIB",
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
        "logflag": false,
        'userObj': {},
        "userPageObj": {},
        'autoTrack': false,
        'pageProperty': null,
        'autoCompleteURL': true

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
        "system": {},
        "netWork": {},
        "scene": null
    },
    "isStartUp": false,
    "FnCatch": [],
    "FnSuperCatch": [],
    "keywords": fieldTemplate.base.xcontext,
    "baseJson": fieldTemplate.base.outer,
    "sendNum": 1800
}