import React, { useEffect, useState } from 'react'
import {
    withRouter,
  } from "react-router-dom";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    BankOutlined,
    BlockOutlined,
    ClusterOutlined,
    ContainerOutlined,
    UserSwitchOutlined,
    SmileOutlined,
    BarChartOutlined,
    LineChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { navLeft } from '../../api/home'
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

const { SubMenu } = Menu;

function NavLeft(props){
    const [navState, setNavState] = useState([])
    
    const initData = () => {
        navLeft().then(res=>{
            console.log(res)
            if(res.data.status === 0){
                setNavState(res.data.msg)
            }
        })
    }

    useEffect(()=>{
        initData()
    },[])

    const goPage = (page) => {
        console.log(page)
        props.history.push({ pathname: page})
    }

    const setNav = (obj) => {
       return obj.map(item=>{
            if(!item.children){ // 没有子菜单
                return (
                    <Menu.Item key={item.page} icon={<item.icon />} onClick={()=>{ goPage(item.page)}}>
                        { item.title }
                    </Menu.Item>
                )
            }else{
                
                return (
                    <SubMenu key={item.page} icon={<item.icon />} title={item.title}>
                        { setNav(item.children) }
                    </SubMenu>
                ) 
            }
        })
    }
    
    console.log('props.history.location.pathname',props.history.location.pathname)
    return (
        <>
            <Menu theme="dark" selectedKeys={[props.history.location.pathname]} mode="inline">
                {
                    setNav(navState)
                }
            </Menu>
        </>
    )
}

export default withRouter(NavLeft)