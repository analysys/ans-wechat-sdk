import PublicApp from '../common/publicApp.js'
let getStoragePromise = PublicApp.Storage.getStoragePromise
let setStoragePromise = PublicApp.Storage.setStoragePromise
class storage {
    constructor() {
        this.local = {}
        this.Session = {}
        this.localStatus = false
        this.getStoragePromise = PublicApp.Storage.getStoragePromise
    }
    initLocalData() {

        return getStoragePromise('FZ_STROAGE').then((value) => {
            if (this.localStatus) {
                return
            }
            this.localStatus = true
            if (!value) {
                value = {}
            }

            if (typeof value == 'string') {
                try {
                    value = JSON.parse(value)
                } catch (e) {
                    value = {}
                }
            }
            this.local = Object.assign(value, this.local)

            setStoragePromise("FZ_STROAGE", this.local).then(() => { }, (e) => { }).catch((e) => { })

        }, () => {
            this.local = {}
        }).catch((e) => { })
    }
    setData(name, value) {
        this.Session[name] = value
    }
    getData(name) {

        return this.Session[name] === "undefind" ? "" : this.Session[name]
    }
    removeData(name) {
        if (this.Session[name] !== "undefind") {
            delete this.Session[name]
        }
    }
    clearData() {
        this.Session = {}
    }
    setLocal(name, val) {
        this.local[name] = val
        let value = this.local
        setStoragePromise("FZ_STROAGE", value).then(() => {

        }, (e) => { }).catch((e) => { })
    }
    getLocal(name) {
        return this.local[name]
    }
    removeLocal(name) {
        if (this.local[name] !== "undefind") {
            delete this.local[name]
            let value = this.local
            setStoragePromise("FZ_STROAGE", value).then(() => {
            }, () => { }).catch((e) => { })
        }
    }
}
export default new storage()