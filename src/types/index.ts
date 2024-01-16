/**
 * sdk配置参数类型
 */

export interface initConfig {
  appkey?: string;
  uploadURL?: string;
  debugMode?: number;
  autoStartUp?: boolean;//是否自动采集startUp
  autoEnd?:boolean; //是否自动采集end
  auto?: boolean; //是否自动采集pageview
  autoProfile?: boolean;  //是否自动追踪新用户的首次属性
  encryptType?: number;
  autoShare?: boolean; //是否自动采集分享按钮点击事件
  allowTimeCheck?: boolean;
  maxDiffTimeInterval?: number;
  autoTrack?: boolean; //是否自动采集全埋点
  autoCompleteURL?: boolean;
  autoPageViewDuration?: boolean;
  sendDataTimeout?: number;
  $appid?: string;
  $appname?: string;
}


/**
 * 埋点数据类型
 */

export interface xcontextValue {
  $url?: string;
  $is_login?: boolean;
}


export interface buriedPointData {
  appid: string;
  xwho: string;
  xwhat: string;
  xwhen: number;
  xcontext: xcontextValue;
}

// 日志提示类型
export interface msgetype {
	key?: string
	value?: any
	code: string | number
	fn?: string
	keyType?: string
}