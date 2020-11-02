import baseConfig from '../../../lib/baseConfig/index'
/**
 * 返回对应场景值
 * @returns {String} scene 场景值
 */

function getScene () {
    return baseConfig.system.scene ? baseConfig.system.scene.toString() : ''
}
/**
 * 返回包名
 * @returns {String} packageName 包名
 */
function getPackageName () {
    return ''
}

function getPath () {
    let pathArray = getCurrentPages()
    // 有时pathArray 为空数组  []
    if (pathArray.length > 0) {
        let path = pathArray[pathArray.length - 1].__route__
        let options = pathArray[pathArray.length - 1].options;
        // 组件完整 URL
        if (Object.keys(options).length > 0 && baseConfig.base.autoCompleteURL == true) {
            let urlWithArgs = path + '?'
            for (let key in options) {
                let value = options[key]
                urlWithArgs += key + '=' + value + '&'
            }
            urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
            return urlWithArgs
        }
        return path;
    }
}

function getTitle () {
    return ''
}

function getReferer () {
    let pathArray = getCurrentPages()
    if (pathArray.length > 1 && pathArray[pathArray.length - 2]) {
        return pathArray[pathArray.length - 2].__route__
    }
    return getScene()
}
export {
    getScene,
    getPackageName,
    getPath,
    getTitle,
    getReferer
}