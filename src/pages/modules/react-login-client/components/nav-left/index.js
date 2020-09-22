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
import { saveStore } from '@/common/utils'

const { SubMenu } = Menu;

let selectKey = '/admin/loginHme'

function NavLeft(props){
    const [navState, setNavState] = useState([])
    
    const initData = () => {
        navLeft().then(res=>{
            console.log(res)
            if(res.data.status === 0){
                saveStore('routeMsg', res.data.msg)
                setNavState(res.data.msg)
            }
        })
    }

    useEffect(()=>{
        initData()
    },[])

    const goPage = (page,item) => {
        props.history.push({ pathname: page})
    }

    const setNav = (obj) => {
        
       return obj.map(item=>{
            if(!item.children){ // 没有子菜单
                if(props.history.location.pathname === item.page){
                    saveStore('currentPage', item)
                }
                return (
                    <Menu.Item key={item.page} icon={<BarChartOutlined />} onClick={()=>{ goPage(item.page,item)}}>
                        { item.title }
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu key={item.page} icon={<BarChartOutlined />} title={item.title}>
                        { setNav(item.children) }
                    </SubMenu>
                ) 
            }
        })
    }

    const onSelect = (val) => {
        selectKey = val.key
    }
    
    console.log('props.history.location.pathname',props)
    return (
        <>
            <Menu theme="dark" onSelect={onSelect} selectedKeys={[selectKey]} mode="inline">
                {
                    setNav(navState)
                }
            </Menu>
        </>
    )
}

export default withRouter(NavLeft)