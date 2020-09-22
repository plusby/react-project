import React,{useState,useEffect,useRef} from 'react'
import {
    Switch,
    Route,
    withRouter,
  } from "react-router-dom";
import { Layout, Breadcrumb } from 'antd';
import ReactLogin from '@/router/modules/react-login-client/index.js' 
import Head from '../../components/header'
import NavLeft from '../../components/nav-left'
import NavTop from '../../components/nav-top'
import { Redirect } from 'react-router-dom'
import { getStore } from '@/common/utils'

const { Header, Content, Footer, Sider } = Layout;



function Admin(){
    let [collapsed,setCollapsed] = useState(false) 
    const userInfo = getStore('userInfo')
    let arrRoutes = []

    const onCollapse = () => {
        setCollapsed(!collapsed)
        console.log(collapsed)
    }
    

    const setRoute = (routes,arr) => {
        arr = arr || []
        for(let i = 0; i < routes.length; i++){
            let item = routes[i]
            if(item.children){
                arr.push(<Route
                    key={item.path}
                    path={item.path}
                    exact={item.exact}
                    render={props => {
                        return (
                        <item.component {...props}></item.component>
                        );
                    }}
                />)
                setRoute(item.children,arr)
             }else{
                arr.push(<Route
                    key={item.path}
                    path={item.path}
                    exact={item.exact}
                    render={props => {
                        return (
                        <item.component {...props}></item.component>
                        );
                    }}
                />)
             }
        }
        return arr
    }

    console.log('setRoute(ReactLogin[1].children,arrRoutes)',setRoute(ReactLogin[1].children,arrRoutes))

    return (
        <div>
            {
                !userInfo && !userInfo.id && <Redirect to='/login' /> 
            }
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" style={{ minHeight: '9vh' }} />
                    <NavLeft />
                </Sider>
                <Layout className="site-layout">
                    <Head />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                            <Switch>
                                {
                                    setRoute(ReactLogin[1].children,arrRoutes)
                                }
                                <Redirect to={ReactLogin[1].children[0].path} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default withRouter(Admin)