import React from 'react';
import logo from '@/assets/logo.jpg'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import { login as loginHttp } from '../../api/home'
import '@/mock/index'
import { saveStore, getStore } from '@/common/utils'

function Login(props) {
    
    const [form] = Form.useForm();
    const userInfo = getStore('userInfo')
    console.log(props)

    // 已经登录了就跳到admin
    // if(userInfo.id){
    //     props.history.push({ pathname: '/admin' })
    // }   

    // 提交
    const onFinish = (vals) => {
        form.validateFields().then(async vals=>{
            const params = {
                username: vals.username,
                passwd: vals.password
            }
            const result = await loginHttp(params)
            console.log(result)
            if (result.data && result.data.status === 0) {
                saveStore('userInfo', result.data.msg)
                message.success('登录成功')
                props.history.push({ pathname: "/admin" });
            }

        },err=>{
            console.log(err)
        })
    }

    // 验证密码
    const validator = (rule, value) => {
        console.log(rule, value)
        const reg =  /^(([A-z])|([0-9]))+$/g
        if (!value) {
            return Promise.reject('密码不能为空');
        }else if (!reg.test(value)) {
            return Promise.reject('密码必须是由数组和字母组成');
        } else if (value.length > 9 || value.length < 6){
            return Promise.reject('密码由6-9位组成');
        }
        return Promise.resolve();
    }

    return (
        <>
            {
                userInfo && userInfo.id && <Redirect to='/admin'/>
            }
            <div className="login-wrap">
                <header>
                    <img src={logo} />
                    <h2>哈哈后台管理系统</h2>
                </header>
                <section>
                    <h3>欢迎登录</h3>
                    <Form
                        name="normal_login"
                        className="login-form"
                        form={form}
                        initialValues={{ remember: true, username: 'admin'  }}
                        onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true,whitespace:true, message: '用户名不能为空！' },{ min:5,max:9, message: '用户名由5到9位字母和数字组成！' },{ pattern:/^(([A-z])|([0-9]))+$/g,message: '用户名由数字和字母组成'}]}
                    >   
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, whitespace:true, message: 'Please input your Password!'},()=>({
                            validator})]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                    </Form>
                </section>
            </div>
        </>
    )
}

export default Login;