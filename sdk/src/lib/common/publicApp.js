import * as Fetch from '@Fetch/index'
import * as Storage from '@Storage/index'
import * as System from '@Device/system'
import * as Network from '@Device/network'
import * as Router from '@Router/index'
class publicApp {
    constructor() {
        this.AppObj = $ans
        this.Fetch = Fetch
        this.Storage = Storage
        this.System = System
        this.Network = Network
        this.Router = Router
        this.setPublicApp = (appObj) => {
            this.AppObj = appObj
        }
        this.getPublicApp = () => {
            return this.AppObj
        }
    }
}
export default new publicApp()