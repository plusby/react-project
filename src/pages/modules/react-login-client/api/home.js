import { https } from '@/api/https'

// 登录
export function login(data){
    return https('/login',data,'post')
}