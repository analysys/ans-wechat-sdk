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
        return path
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