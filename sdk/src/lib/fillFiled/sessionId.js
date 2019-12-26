import storage from '../storage/index.js'
import MD5 from '../common/MD5.js'

class SessionId {
    constructor() {
        this.sessionId = '' //storage.getLocal("SEESIONID") || this.setId();
        this.sessionDate = '' //storage.getLocal("SEESIONDATE") || 0;
    }
    setId() {
        let date = +new Date()
        this.sessionId = MD5('WeChat' + date.toString() + Math.random(0, 10000000));
        this.sessionDate = date

        storage.setLocal("SEESIONID", this.sessionId)
        storage.setLocal("SEESIONDATE", this.sessionDate)
        return this.sessionId
        // storage.setLocal("LANGINGPAGE", true)
    }
    getId() {
        let date = new Date()
        let nowDate = date.getTime()
        let offset_GMT = date.getTimezoneOffset()
        let nowDay = new Date(nowDate + offset_GMT * 60 * 1000 + 8 * 60 * 60 * 1000).getDate()

        this.sessionDate = storage.getLocal("SEESIONDATE") || 0
        let sessionDay = this.sessionDate === 0 ? 0 : new Date(this.sessionDate + offset_GMT * 60 * 1000 + 8 * 60 * 60 * 1000).getDate()
        if (this.sessionId === '' || this.sessionDate === 0 || Number(nowDate) - Number(this.sessionDate) > 30 * 60 * 1000 || sessionDay !== nowDay) {

            this.setId()
        }
        this.sessionDate = nowDate
        storage.setLocal("SEESIONDATE", nowDate)
        this.sessionId = storage.getLocal("SEESIONID") || this.setId()
        return this.sessionId
    }
}

export default new SessionId()