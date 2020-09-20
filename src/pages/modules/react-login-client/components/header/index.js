import React,{useState,useEffect,useRef}  from 'react'
import {
    withRouter,
  } from "react-router-dom";
import { Modal } from 'antd';
import { getStore, saveStore, removeStore } from '@/common/utils'
import { navLeft, getWeather } from '../../api/home'
import './index.less'

function Head(props){
    const [currentPage,setCurrentPage] = useState()
    const userInfo = getStore('userInfo')

    const initData = () => {
        getWeather({city: '上海'}).then(res=>{
            console.log(res)
        })

        if (!Object.keys(getStore('routeMsg')).length) { 
            navLeft().then(res=>{
                if(res.data.status === 0){
                    saveStore('routeMsg', res.data.msg)
                    initPage(res.data.msg)
                }
            })
        }
    }

    // 获取当前路由的title
    const initPage = (obj) => {
        return obj.map(item=>{
             if(!item.children){ // 没有子菜单
                 if(props.history.location.pathname === item.page){
                    setCurrentPage(item)
                 }
             }else{
                { initPage(item.children) }
             }
         })
    }

    useEffect(()=>{
        initData()
        if (Object.keys(getStore('routeMsg')).length) {
            initPage(getStore('routeMsg'))
        }
    },[props.history.location.pathname])

    // 退出
    const goOut = () => {
        Modal.confirm({
            title: '提示',
            content: (
              <div>
                <p>确认退出当前用户？</p>
              </div>
            ),
            onOk:()=>{
                removeStore('userInfo')
                props.history.replace('/clientHome')
            },
            cancelText: '取消'
        });
    }

    return (
        <header className="head-background">
            <div className='head-top'>
                <span>
                    欢迎,{userInfo && userInfo.name}
                </span>
                <span onClick={()=>{ goOut() }}>
                    退出
                </span>
            </div>
            <div className='bottom'>
                <span className='left'>
                    {currentPage && currentPage.title}
                </span>
                <span className='right'>321312312</span>
            </div>

        </header>
    )
}

export default withRouter(Head)