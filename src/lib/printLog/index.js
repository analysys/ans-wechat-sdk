import baseConfig from '../baseConfig/index'
import Util from '../common/index'
// import { lifecycle } from '../../configure/index.js'
var errorMessage = {
    'common': '{FN}:Property key invalid, nonsupport value: $lib/$lib_version/$platform/$first_visit_time/$debug/$is_login \n' +
        'current KEY:{KEY}',
    '60001': '{FN}:Property key invalid, support type: String \n' +
        'current key:{KEY}\n' +
        'current keyType:{KEYTYPE}',
    '60002': '{FN}:Property value invalid of key[{KEY}], support type: Number \n' +
        'current value:{VALUE}\n' +
        'current type: {VALUETYPE}',
    '60003': '{FN}:Property value invalid of key[{KEY}], support type: Boolean \n' +
        'current value:{VALUE}\n' +
        'current type: {VALUETYPE}',
    '60004': '{FN}:Property value invalid of key[{KEY}], support type: Array \n' +
        'current value:{VALUE}\n' +
        'current type: {VALUETYPE}',
    '60005': '{FN}:The length of the property[{KEY}] value (string[{VALUE}]) needs to be 1-255 !',
    '60006': 'Please set appkey first.',
    '60007': 'Please set uploadURL first.',
    '60008': 'Send message failed.',
    '60009': '{FN}:The length of the property key (string[{KEY}]) needs to be 1-125 !',
    '600010': '{FN}:The length of the property key (string[{KEY}]) needs to be 1-99 !',
    '600011': '{FN}:[{KEY}] does not conform to naming rules!',
    '600012': '{FN}:Property key invalid, nonsupport value: $lib/$lib_version/$platform/$first_visit_time/$debug/$is_login \n' +
        'current KEY:{KEY}',
    '600013': '{FN}:Property value invalid of key[{KEY}], support type: Array with String as its internal element \n' +
        'current value:{VALUE}\n' +
        'current type: {VALUETYPE}',
    '600016': '{FN}:Property value invalid of key[{KEY}], support type: Object \n' +
        'current value:{VALUE}\n' +
        'current type: {VALUETYPE}',
    '600017': '{FN}:The length of the property key (string[{KEY}]) needs to be 1-255 !',
    '600018': '{FN}:Property value invalid of key[{KEY}] invalid, support type: String \n' +
        'current value:{VALUE}\n' +
        'current type: {VALUETYPE}',
    '600019': '{FN}:The length of the property[{KEY}] value (string[{VALUE}]) needs to be 1-255 !',
    '600020': 'DebugMode only can be 0,1,2',
    '600021': '{FN}:Property value invalid of key[{KEY}], support type: Object, Object.keys length needs to be 1-499 \n' +
        'current length:{VALUE}\n'
}
var successMessage = {
    'common': '',
    '20001': 'Send message success',
    '20002': '{FN}: set success ({VALUE})',
    '20003': '{FN}:({VALUE}) delete success',
    '20004': '{FN}:clear success',
    '20005': '{FN}:reset success',
    '20006': 'set appkey success. current appkey : {VALUE}',
    '20007': 'Init Analysys WeChat sdk success, version : {VALUE}',
    '20008': 'set uploadURL success. current uploadURL : {VALUE}',
    '20009': '{FN}:[{KEY}] : get failed',
    '20010': '{FN}:[{KEY}] : get success. ({VALUE})',
    '20011': '{FN}:({VALUE}) delete failed',
    '20012': 'Send Message to Server: {KEY} \n' +
        'data:{VALUE}',
    '20013': "收到服务器的时间: {VALUE} \n" +
        "本地时间: {KEY} \n" +
        "时间相差:  {FN} \n" +
        "数据将会进行时间校准"
}

function successLog(msg) {
    if (baseConfig.base.$debug === 1 || baseConfig.base.$debug === 2) {
        var status = baseConfig.status
        var successCode = status.successCode
        var fn = status.FnName
        var key = status.key
        var value = status.value
        var msgTemp = successMessage[successCode] || successMessage.common
        var showMsg = msgTemp.replace(/{FN}/, fn)
            .replace(/{KEY}/g, key)
            .replace(/{VALUE}/g, value)
        if (msg) {
            showMsg = msg
        }
        if (!showMsg) return
        if (Util.paramType(console) === 'Object' && console.log) {
            try {
                return console.log.apply(console, showMsg);
            } catch (e) {
                console.log(showMsg);
            }
        }
    }
}

function errorLog() {
    var status = baseConfig.status;
    var errorCode = status.errorCode;
    var fn = status.FnName;
    var key = status.key;
    var value = JSON.stringify(status.value);
    var valueType = Util.paramType(status.value);
    var keyType = Util.paramType(key)
    var msgTemp = errorMessage[errorCode] || errorMessage.common;
    var showMsg = msgTemp.replace(/{FN}/g, fn)
        .replace(/{KEY}/g, JSON.stringify(key))
        .replace(/{VALUE}/g, value)
        .replace(/{VALUETYPE}/g, valueType)
        .replace(/{KEYTYPE}/g, keyType)

    if (baseConfig.base.$debug === 1 || baseConfig.base.$debug === 2) {
        console.warn(showMsg)
    }
}

export {
    errorLog,
    successLog
}