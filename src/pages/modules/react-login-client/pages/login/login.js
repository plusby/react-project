import React from 'react';
import logo from '@/assets/logo.jpg'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'

function Login(props) {
    
    const [form] = Form.useForm();
    console.log(form)


    // 提交
    const onFinish = (vals) => {
        console.log(vals)
    }

    // 验证密码
    const validator = (rule, value) => {
        console.log(rule, value)
        const reg =  /^(([A-z])|([0-9]))+$/g
        if (!reg.test(value)) {
          return Promise.reject('密码必须是由数组和字母组成');
        } else if (value.length > 9 || value.length < 6){
            return Promise.reject('密码由6-9位组成');
        }
        return Promise.resolve();
    }

    return (
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
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true,whitespace:true, message: '用户名不能为空！' },{ pattern:/^(([A-z])|([0-9]))+$/g,message: '用户名由数字和字母组成'}]}
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
    )
}

export default Login;