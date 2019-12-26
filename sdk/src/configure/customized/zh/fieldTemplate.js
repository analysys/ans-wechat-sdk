/**
 * SDK 基础字段定义表
 * base.outer：上报日志基础结构定义
 * base.xcontext:上报报文找中xcontext下的共有字段定义
 * $开头的字段为各个事件特殊拥有字段
 */
export default {
    "$startup": {
        "xcontext": [
            "$original_id",   //招商银行特有
        ]
    },
    "$track": {
        "xcontext": [
            "$original_id"   //招商银行特有
        ]
    },
    "$pageview": {
        "xcontext": [
            "$original_id"   //招商银行特有
        ]
    },
}