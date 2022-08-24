
import { globalWindow } from '../../constant/index'
// import { isString } from '../../utils/type'

interface requestOptions {
  url: string,
  data?: any,
  method?: string,
  header?: object,
  timeout?: number
}

export default (options: requestOptions, success?: (response: any) => void) : any => {
  return new Promise((resolve, reject) => {
    globalWindow.request({
      ...options,
      success (res) {
        const data = res.data
        // const setData = (code) => {
        //   data = {
        //     code: code
        //   }
        // }
        success && success(res)
        // if (isString(data)) {
        //   if (data == "H4sIAAAAAAAAAKtWSs5PSVWyMjIwqAUAVAOW6gwAAAA=") {
        //     setData(200)
        //   } else if (data == "H4sIAAAAAAAAAKtWSs5PSVWyMjUwqAUA7TtBdwwAAAA=") {
        //     setData(500)
        //   } else if (data == "H4sIAAAAAAAAAKtWSs5PSVWyMjEy0FHKLU5XslJySSxJVHBJTS6qLChRcC0qyi/S01OqBQBdATGSKQAAAA==") {
        //     setData(420)
        //   } else {
        //     setData(200)
        //   }
        //   data.code === 200 ? resolve(data) : reject(data)
        // } else {
        //   reject(data)
        // }

        data && (data.code === 200 || data === 'Status: OK') ? resolve(data) : reject(data)
        
      },
      fail (e) {
        success && success(e)
        reject(e)
      }
    })
  })
}