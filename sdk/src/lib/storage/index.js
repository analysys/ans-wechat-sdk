import Util from '../common/index'

let getStoragePromise = function (name) {
    return new Promise(function (resolve, reject) {
        try {
            let value = wx.getStorageSync(name)
            if (value) {
                resolve(value)
            }
        } catch (e) {
            wx.getStorage({
                key: name,
                success: function (res) {
                    resolve(res.data)
                },
                fail: function (res) {
                    reject(res)
                }
            })
        }
    }).catch((e) => {
    })
}
let setStoragePromise = function (name, value) {
    return new Promise(function (resolve, reject) {
        let val = value
        try {
            wx.setStorageSync(name, val)
            resolve(200)
        } catch (e) {
            wx.setStorage({
                key: name,
                data: val,
                success: function () {
                    resolve(200)
                },
                fail: function () {
                    reject(400)
                }
            })
        }
    }).catch((e) => { })
}
class storage {
    constructor() {
        this.local = {}
        getStoragePromise('FZ_STROAGE').then((value) => {
            if (value.constructor === String) {
                value = JSON.parse(value)
            }
            this.local = Util.objMerge(value, this.local) || {}
            setStoragePromise("FZ_STROAGE", this.local).then(() => {

            }, (e) => {
            }).catch((e) => {
            })

        }, () => {
            this.local = {}
        }).catch((e) => { })
        this.Session = {}
    }
    setData (name, value) {
        this.Session[name] = value
    }
    getData (name) {
        return this.Session[name] === "undefind" ? "" : this.Session[name]
    }
    removeData (name) {
        if (this.Session[name] !== "undefind") {
            delete this.Session[name]
        }
    }
    clearData () {
        this.Session = {}
    }
    setLocal (name, val) {
        this.local[name] = val
        let value = this.local
        setStoragePromise("FZ_STROAGE", value).then(() => {

        }, (e) => {
        }).catch((e) => {
        })
    }
    getLocal (name) {
        return this.local[name]
    }
    removeLocal (name) {
        if (this.local[name] !== "undefind") {
            delete this.local[name]
            let value = this.local
            setStoragePromise("FZ_STROAGE", value).then(() => {
            }, () => {
            }).catch((e) => { })
        }
    }
}
export default new storage()