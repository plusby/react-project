import axios from 'axios'
import { message } from 'antd'

let base = process.env.NODE_ENV !== 'production' ? '' : ''
let baseWeather = process.env.NODE_ENV !== 'production' ? 'https://api.gugudata.com/' : 'https://api.gugudata.com/'
/*
    params:
        url: 请求接口路径
        data: 参数
        type: 请求类型
        isErr: 是否返回reject错误数据，false直接在这里提示错误，使用的时候不再处理否则就是再使用的时候去接收错误
*/

export function https (url, data = {},type = 'get',isErr){
    if(url.startsWith('weather/')){
        url = baseWeather + url
    }else{
        url = base + url
    }
    
    return new Promise((resolve,rej)=>{
        let promiseResult = null
        if (type === 'get') {
            promiseResult = axios.get(url,{
                params: data
            })
        } else if (type === 'post') {
            console.log('data',data)
            promiseResult = axios({
                method: "post",
                url,
                data
              })
        }
        promiseResult.then(res=>{
            resolve(res)
        },err=>{
            if (!isErr) {
                message.error(err.message)
                return
            }
            rej(err)
        })  
    })
    
}