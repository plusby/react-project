import { https } from '@/api/https'


// 登录
export function login(data){
    return https('/api/login',data,'post')
}

// 获取菜单配置数据
export function navLeft(id){
    return https(`/api/navLeft?id=${id}`,{},'get')
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

// 获取商品数据
export function getCommodity({type,name}){
    return https(`/api/getCommodity?type=${type}&name=${name}`,{},'get')
}

// 获取角色数据
export function getRole(){
    return https(`/api/getRole`,{},'get')
}

// 添加角色数据
export function addRole(data){
    return https(`/api/addRole`,data,'post')
}

// 删除角色数据
export function deleteRole(id){
    return https(`/api/deleteRole?id=${id}`,{},'get')
}

// 为角色添加权限
export function addPower(data){
    return https(`/api/addPower`,data,'post')
}