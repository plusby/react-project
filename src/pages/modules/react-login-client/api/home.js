import { https } from '@/api/https'


// 登录
export function login(data){
    return https('/api/login',data,'post')
}

// 获取菜单配置数据
export function navLeft(data){
    return https('/api/navLeft',data,'get')
}

// 获取天气数据
export function getWeather({city}){
    return https(`weather/weatherinfo?appkey=PU8269ABUZ2K&keyword=${city}&days=1`,{},'get')
}

// 获取品类数据
export function getCategory({page,category}){
    return https(`/api/getCategory?page=${page}&category=${category}`,{},'get')
}

// 添加品类数据
export function addCategory(data){
    return https(`/api/addCategory`,data,'post')
}

// 修改品类数据
export function changeCategory(data){
    return https(`/api/changeCategory`,data,'post')
}