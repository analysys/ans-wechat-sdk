import storage from '../storage/index.js'
import baseConfig from '../baseConfig/index'

class Util {
    constructor() { }
    paramType (str) {
        return Object.prototype.toString.call(str).replace('[object ', '').replace(']', '')
    }
    delEmpty (obj) {
        let newObj = this.deepClone(obj)
        if (this.paramType(newObj) === "Object") {
            Object.keys(newObj).forEach((key) => {
                let value = newObj[key]
                if (this.paramType(value) === 'Object') {
                    newObj[key] = this.delEmpty(newObj[key])
                    if (Object.keys(newObj[key]).length === 0) {
                        delete newObj[key]
                    }
                }
                if (value === "") {
                    delete newObj[key]
                }
            })
        } else {
            return {}
        }
        return newObj
    }
    deepClone (obj) {
        let proto = Object.getPrototypeOf(obj);
        return Object.assign({}, Object.create(proto), obj);
    }
    mergeMsg (obj, msg) {
        Object.assign(msg, obj)
    }
    checkObj (key, value) {
        let obj = {}
        if (arguments.length === 1 && key.constructor === Array) {
            for (let i = 0; i < key.length; i++) {
                obj[key[i]] = ''
            }
            return obj
        }
        if (arguments.length === 1 && key.constructor === String) {
            obj[key] = value || ""
            return obj
        }
        if (arguments.length > 1 && key.constructor !== Object) {
            obj[key] = value
        } else {
            obj = key
        }
        return obj
    }
    isFristDay () {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        month = month < 10 ? '0' + month : month
        let day = date.getDate()
        day = day < 10 ? '0' + day : day
        let todayDate = year + '' + month + '' + day
        let storageDay = storage.getLocal("FRISTDAY")
        if (storageDay && todayDate !== storageDay) {
            return false
        }
        if (!storageDay) {
            storage.setLocal("FRISTDAY", todayDate)
        }
        return true
    }
    isFristTime () {
        let fristTime = storage.getLocal("FRISTIME") !== false ? true : false
        if (fristTime) {
            storage.setLocal("FRISTIME", false)
        }
        return fristTime
    }
    isEmptyObject (obj) {
        if (Object.keys(obj).length > 0) {
            return false;
        }
        return true;
    }
    setFristDay () {
        if (this.paramType(storage.getLocal("FRISTDAY")) === 'String') return
        let timeDay = this.format(new Date(), 'yyyyMMdd');
        if (baseConfig.base.allowTimeCheck && baseConfig.base.logflag) {
            timeDay = this.format(new Date(+new Date() + (storage.getLocal("ANSSERVERTIME") ? Number(storage.getLocal("ANSSERVERTIME")) : 0)), 'yyyyMMdd')
        }
        storage.setLocal("FRISTDAY", timeDay);
    }
    setFristTime () {
        if (this.paramType(storage.getLocal("FRISTIME")) === 'Boolean') return
        storage.setLocal("FRISTIME", true)
    }
    delFristDay () {
        storage.removeLocal("FRISTDAY")
    }
    delFristTime () {
        storage.removeLocal("FRISTIME")
    }
    checkURL (URL) {
        let str = URL;
        //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
        //下面的代码中应用了转义字符"\"输出一个字符"/"
        let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        let objExp = new RegExp(Expression);
        if (objExp.test(str) == true) {
            return true;
        } else {
            return false;
        }
    }
    firstVisitTime () {
        let isfirstVisitTime = storage.getLocal("FIRSTVISITTIME") !== false ? true : false
        if (isfirstVisitTime) {
            storage.setLocal("FIRSTVISITTIME", false)
        }
        return isfirstVisitTime
    }
    toDeepObj (param1, param2, level) {
        var obj = {}
        if (this.paramType(param1) === 'String') {
            obj = this.keyValueToObje(param1, param2)
            return obj
        }
        if (this.paramType(param1) === 'Array') {
            obj = this.ArrayToObj(param1)
            return obj
        }
        if (this.paramType(param1) === 'Object') {
            for (var key in param1) {
                obj[key] = this.toDeepObj(param1[key])
            }
        }
        return obj
    }
    ArrayToObj (arr) {
        var obj = {}
        for (var i = 0; i < arr.length; i++) {
            obj[arr[i]] = ''
        }
        return obj
    }
    keyValueToObje (key, value) {
        var obj = {}
        obj[key] = value;
        return obj
    }
    toObj (param1, param2, level) {
        var obj = {}
        if (this.paramType(param1) === 'String') {
            obj = this.keyValueToObje(param1, param2)
            return obj
        }
        if (this.paramType(param1) === 'Array') {
            obj = this.ArrayToObj(param1)
            return obj
        }
        if (this.paramType(param1) === 'Object') {
            return param1
        }
        return obj
    }
    objMerge (parentObj, part) {
        if (this.paramType(parentObj) !== 'Object' || this.paramType(part) !== 'Object') {
            return parentObj
        }
        var obj = {}
        for (var key in parentObj) {
            obj[key] = parentObj[key]
        }
        for (var key in part) {
            if (obj[key] && this.paramType(obj[key]) === 'Object' && this.paramType(part[key]) === 'Object') {
                obj[key] = this.objMerge(obj[key], part[key])
            } else if (this.paramType(obj[key]) === 'Array' && this.paramType(part[key]) === 'Array') {
                obj[key] = this.arrayMergeUnique(obj[key], part[key])
            } else {
                obj[key] = part[key]
            }
        }
        return obj
    }
    arrayUnique (arr) {
        var tmpArr = [],
            hash = {}; //hash为hash表
        for (var i = 0; i < arr.length; i++) {
            if (!hash[arr[i]]) { //如果hash表中没有当前项
                hash[arr[i]] = true; //存入hash表
                tmpArr.push(arr[i]); //存入临时数组
            }
        }
        return tmpArr
    }
    arrayMerge (arr1, arr2) {
        arr1.push.apply(arr1, arr2)
        return arr1
    }
    arrayMergeUnique (arr1, arr2) {
        arr1.push.apply(arr1, arr2)
        return this.arrayUnique(arr1)
    }
    format (date, format) {
        let offset_GMT = date.getTimezoneOffset();
        date = new Date(date.getTime() + offset_GMT * 60 * 1000 + 8 * 60 * 60 * 1000) //转换为东八区时间
        let o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S+": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 3 ? (("" + o[k]).length < 3 ? ("00" + o[k]).substr(("00" + o[k]).length - 3, ("00" + o[k]).length) : o[k]) :
                        ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
    objHasKay (obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key)
    }
    clientTimeZone () {
        var munites = new Date().getTimezoneOffset();
        var hour = parseInt(munites / 60);
        var munite = munites % 60;
        var prefix = "-";
        if (hour <= 0 || munite < 0) {
            prefix = "+";
            hour = -hour;
            if (munite < 0) {
                munite = -munite;
            }
        }
        hour = hour + "";
        munite = munite + "";
        if (hour.length == 1) {
            hour = "0" + hour;
        }
        if (munite.length == 1) {
            munite = "0" + munite;
        }
        return prefix + hour + ':' + munite;
    }
    objInArray (obj) {
        let objArray = [];
        objArray.push(obj);
        return objArray;
    }
    stringSlice (str, length) {
        return str.slice(0, length);
    }
}

export default new Util()