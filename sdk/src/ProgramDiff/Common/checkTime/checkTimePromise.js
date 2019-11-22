import baseConfig from '../../../lib/baseConfig/index'
import storage from '../../../lib/storage/index'
import { successLog } from '../../../lib/printLog/index'
import Util from '../../../lib/common/index'
import { resetCode } from '../../../lib/fillFiled/index'



let checkTimePromise = function (name) {
    return new Promise(function (resolve, reject) {
        resetCode();
        if (!baseConfig.base.allowTimeCheck) {
            return resolve()
        }
        // 上报url 进行拆分，不带up。
        let uploadURL = baseConfig.base.uploadURL;
        uploadURL = uploadURL.split('up')[0];
        wx.request({
            url: uploadURL + "configure",
            method: 'GET',
            success: function (res) {
                resolve(res)
                // 返回成功后 更改标识
                if (res.header && res.header.Date) {
                    let time = +new Date()
                    let date = res.header.Date;
                    // 获取最大允许误差，看看是否要进行时间校准  
                    let maxDiffData = baseConfig.base.maxDiffTimeInterval;
                    if (maxDiffData < 0) {
                        maxDiffData = 30;
                    }
                    if (date && maxDiffData < Math.abs((+new Date(date) - time) / 1000)) {
                        // 打印日志
                        if (!baseConfig.base.logflag) {
                            storage.setLocal('ANSSERVERTIME', +new Date(date) - time);
                            baseConfig.status.successCode = "20013";
                            baseConfig.status.value = Util.format(new Date(date), 'yyyy-MM-dd hh:mm:ss +SSS');
                            baseConfig.status.key = Util.format(new Date(time), 'yyyy-MM-dd hh:mm:ss +SSS');
                            baseConfig.status.FnName = (+new Date(date) - time) / 1000 + 's';
                            successLog();
                            baseConfig.base.logflag = true;
                        }
                    }
                };
            },
            fail: function (res) {
                // 超时也会进入 fail,resolve 是保证main_custom.js 前面的两个promise 能正常返回
                resolve(res);
            }
        })


    }).catch((e) => { })
}

export {
    checkTimePromise
}