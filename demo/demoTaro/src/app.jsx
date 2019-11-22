import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

import AnalysysAgent from './sdk/AnalysysAgent_WX_SDK.custom.min.js';
import * as AnalysysEncryption from './sdk/AnalysysAgent_encryption.min.js';
// taro 不能引入 es6 不支持。
AnalysysAgent.encrypt = AnalysysEncryption;   //加密模块的方法赋值给，方便调用。



AnalysysAgent.debugMode = 2
AnalysysAgent.appkey = '用户设置appid'
AnalysysAgent.uploadURL = '用户设置uploadURL'
AnalysysAgent.encryptType = 2;
AnalysysAgent.autoShare = true;
AnalysysAgent.allowTimeCheck = true;
AnalysysAgent.maxDiffTimeInterval = 1;

class App extends Component {
    config = {
        pages: [
            'pages/index/index',
            'pages/logs/logs',
            'pages/third/third'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    }
    // globalData = {
    //     AnalysysAgent: AnalysysAgent
    // }
    componentWillMount () {
        // AnalysysAgent.alias("1")
        AnalysysAgent.registerSuperProperty("age", 20)
        AnalysysAgent.pageView('2222', { a: 1 });
    }
    componentDidMount () {
        AnalysysAgent.identify("identy111111122", false)
    }

    componentDidShow () {
        const params = this.$router.params
        AnalysysAgent.appStart(params);
    }

    componentDidHide () {
    }

    componentDidCatchError () { }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render () {
        return (
            <Index />
        )
    }
}

Taro.render(<App />, document.getElementById('app'))
