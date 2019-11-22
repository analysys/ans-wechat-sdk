function scenePromise () {
    let promist = new Promise(function (resolve, reject) {
        let scene = wx.getLaunchOptionsSync();
        resolve(scene);
    }).catch((e) => {

    })
    return promist
}

export {
    scenePromise
}