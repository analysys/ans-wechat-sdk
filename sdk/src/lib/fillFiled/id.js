import storage from '../storage/index.js'
import MD5 from '../common/MD5'

class idObj {
    constructor() { }
    getId () {
        let id = storage.getLocal('ARK_LOGINID') || storage.getLocal('ARK_TRACKID') || storage.getLocal('ARK_ID')
        if (!id) {
            id = this.setId()
            storage.setLocal('ARK_ID', id)
        }
        return id
    }
    setId () {
        let timeRandom = new String(new Date().getTime()) + new String(Math.random() * 10000);
        return '$ANS' + MD5(new String(timeRandom), 32) + MD5(new String(timeRandom), 32).slice(0, 4)
        // return 'WX' + new String(timeRandom).MD5(32) + new String(timeRandom).MD5(32).slice(0, 4);
    }
    jsId () {
        let id = storage.getLocal('ARK_ID')
        if (!id) {
            id = this.setId()
        }
        return id
    }
    removeARKId () {
        storage.removeLocal('ARK_ID')
    }
    setLoginId (id) {
        if (id) {
            storage.setLocal('ARK_LOGINID', id)
        }
    }
    setLoginOId (oId) {
        if (oId) {
            storage.setLocal('ARK_LOGINOID', oId)
        }
    }
    getLoginOId () {
        let id = storage.getLocal('ARK_LOGINOID')
        return id
    }
    getLoginId () {
        let id = storage.getLocal('ARK_LOGINID')
        return id
    }
    removeLoginId () {
        storage.removeLocal('ARK_LOGINID')
    }
    setTrackId (id) {
        if (id) {
            storage.setLocal('ARK_TRACKID', id)
        }
        // let loginId = storage.getLocal('ARK_LOGINID')
        // if (!loginId) {
        //     baseConfig.base.xwho = id
        // } else {
        //     msgConfig.base.xwho = loginId
        // }
        // let msg = Util.delEmpty(msgConfig)
    }
    getTrackId () {
        return storage.getLocal('ARK_TRACKID')
    }
    removeTrackId () {
        storage.removeLocal('ARK_TRACKID')
    }
    getAliasId () {
        return storage.getLocal('ARK_LOGINID')
    }
    removeAliasId () {
        storage.removeLocal('ARK_LOGINID')
    }
    setIdentifyId (id) {
        storage.setLocal('ARK_TRACKID', id)
    }

    getIdentifyId () {
        return storage.getLocal('ARK_TRACKID')
    }

    removeIdentifyId () {
        storage.removeLocal('ARK_TRACK_LOGIN')
        // storage.removeLocal('ARK_TRACKID')
    }
}


export default new idObj()