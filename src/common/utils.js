import store from 'store'

export function saveStore(key,user){
    store.set(key,user)
}

export function getStore(key){
    return store.get(key) || {}
}

export function removeStore(key){
    store.remove(key)
}