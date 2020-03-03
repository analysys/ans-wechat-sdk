/**
 * [getStoragePromise description] 获取存储
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */

let getStoragePromise = function (name) {
    return new Promise(function (resolve, reject) {
        try {
            let value = wx.getStorageSync(name)
            if (value) {
                resolve(value)
            } else {
                resolve({})
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
/**
 * [setStoragePromise description]设置存储
 * @param {[type]} name  [description]
 * @param {[type]} value [description]
 */
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
    }).catch((e) => {
    })
}
export { getStoragePromise, setStoragePromise }