import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.css'
// const app = Taro.getApp();

let AnalysysAgent = wx.AnalysysAgent

export default class Index extends Component {

    config = {
        navigationBarTitleText: '首页'
    }

    componentWillMount () {
        AnalysysAgent.pageView('首页')
    }

    componentDidMount () {
    }

    componentWillUnmount () { }

    componentDidShow () {

    }

    componentDidHide () { }
    getPresetProperties = () => {
        AnalysysAgent.getPresetProperties();
    }

    onShareAppMessage = () => {
        // console.log("来到这里")
        let shareObj = {
            'path': "pages/index/index?id=33333",
            'title': "框架版分享标识"
        }
        let anshare = AnalysysAgent.share(shareObj);
        return anshare;
    }

    pageView = () => {
        let pageInfo = {
            "commodityName": "iPhone",
            "commodityPrice": 8000
        }
        AnalysysAgent.pageView("商品页", pageInfo)
    }
    alias = () => {
        AnalysysAgent.alias("sanban", "yiban")
    }
    identify = () => {
        AnalysysAgent.identify("userName")
    }
    reset = () => {
        AnalysysAgent.reset()
    }
    registerSuperProperty = () => {
        AnalysysAgent.registerSuperProperty("age", 20)
    }
    registerSuperProperties = () => {
        let superProperty = {
            "age": 20,
            "member": "VIP"
        }
        AnalysysAgent.registerSuperProperties(superProperty)
    }
    unRegisterSuperProperty = () => {
        AnalysysAgent.unRegisterSuperProperty("age")
    }
    clearSuperProperties = () => {
        AnalysysAgent.clearSuperProperties()
    }
    getSuperProperty = () => {
        AnalysysAgent.getSuperProperty("member")
    }
    getSuperProperties = () => {
        AnalysysAgent.getSuperProperties()
    }
    track = () => {
        let eventInfo = {
            "money": 2000
        }
        AnalysysAgent.track("payment", eventInfo)
    }
    profileSet = () => {
        let profiles = {
            "Email": "yonghu@163.com",
            "WeChatID": "微信号"
        }
        AnalysysAgent.profileSet(profiles)
    }
    profileSetOnce = () => {
        let setOnceProfiles = {
            "activationTime": "1521594686781",
            "loginTime": "1521594726781"
        }
        AnalysysAgent.profileSetOnce(setOnceProfiles)
    }
    profileIncrement = () => {
        let profies = {
            "age": 20,
            "integral": 200
        }
        AnalysysAgent.profileIncrement(profies)
    }
    profileAppend = () => {
        AnalysysAgent.profileAppend("Movies", "霸王别姬")
    }
    profileAppendObject = () => {
        let propertyObject = { 'Movies': '霸王别姬', 'Music': ['一无所有', '花房姑娘'] }
        AnalysysAgent.profileAppend(propertyObject)
    }
    profileAppendArray = () => {
        let properties = ["海上钢琴师", "指环王"]
        AnalysysAgent.profileAppend("Movies", properties)
    }
    profileUnset = () => {
        AnalysysAgent.profileUnset("Movies")
    }
    profileDelete = () => {
        AnalysysAgent.profileDelete()
    }
    nextPage = () => {
        wx.navigateTo({
            url: '../logs/logs'
        })
    }
    getDistinctId = () => {
        let DistinctId = AnalysysAgent.getDistinctId()
        // console.log(DistinctId)
    }
    render () {
        return (
            <View class='container'>
                <View class='header'>
                    <Button onClick={this.getPresetProperties} hover-class='button Hove'>getPresetProperties</Button>
                    <Button onClick={this.nextPage} hover-class='Button Hove'>下一页</Button >
                    <Button onClick={this.pageView} hover-class='Button Hove'>pageView</Button >
                    <Button onClick={this.track} hover-class='Button Hove'>track</Button >
                    <Button onClick={this.alias} hover-class='Button Hove'>alias</Button >
                    <Button onClick={this.identify} hover-class='Button Hove'>identify</Button >
                    <Button onClick={this.reset} hover-class='Button Hove'>reset</Button >
                    <Button onClick={this.registerSuperProperty} hover-class='Button Hove'>registerSuperProperty</Button >
                    <Button onClick={this.registerSuperProperties} hover-class='Button Hove'>registerSuperProperties</Button >
                    <Button onClick={this.unRegisterSuperProperty} hover-class='Button Hove'>unRegisterSuperProperty</Button >
                    <Button onClick={this.clearSuperProperties} hover-class='Button Hove'>clearSuperProperties</Button >
                    <Button onClick={this.getSuperProperty} hover-class='Button Hove'>getSuperProperty</Button >
                    <Button onClick={this.getSuperProperties} hover-class='Button Hove'>getSuperProperties</Button >
                    <Button onClick={this.profileSet} hover-class='Button Hove'>profileSet</Button >
                    <Button onClick={this.profileSetOnce} hover-class='Button Hove'>profileSetOnce</Button >
                    <Button onClick={this.profileIncrement} hover-class='Button Hove'>profileIncrement</Button >
                    <Button onClick={this.profileAppend} hover-class='Button Hove'>profileAppend 单个属性</Button >
                    <Button onClick={this.profileAppendObject} hover-class='Button Hove'>profileAppend 多个属性集合</Button >
                    <Button onClick={this.profileAppendArray} hover-class='Button Hove'>profileAppend 列表类型属性</Button >
                    <Button onClick={this.profileUnset} hover-class='Button Hove'>profileUnset</Button >
                    <Button onClick={this.profileDelete} hover-class='Button Hove'>profileDelete</Button >
                    <Button onClick={this.getDistinctId} hover-class='Button Hove'>getDistinctId</Button >
                    <Button open-type='share' hover-class='Button Hove'>分享</Button >
                </View>
            </View>
        )
    }
}
