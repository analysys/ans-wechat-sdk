function systemPromise () {
    let promist = new Promise(function (resolve, reject) {
        wx.getSystemInfo({
            success: function (res) {
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            }
        })
    }).catch((e) => {

    })
    return promist
}

export {
    systemPromise
}




