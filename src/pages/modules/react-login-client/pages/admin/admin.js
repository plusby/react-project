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
    
    const onCollapse = () => {
        setCollapsed(!collapsed)
        console.log(collapsed)
    }

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
                                    ReactLogin[1].children.map(item=>{
                                        return <Route
                                            key={item.path}
                                            path={item.path}
                                            render={props => {
                                                return (
                                                <item.component {...props}></item.component>
                                                );
                                            }}
                                        />
                                    })
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