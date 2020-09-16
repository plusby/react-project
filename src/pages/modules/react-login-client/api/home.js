import { https } from '@/api/https'


// 登录
export function login(data){
    return https('/api/login',data,'post')
}

// 获取菜单配置数据
export function navLeft(data){
    return https('/api/navLeft',data,'get')
}