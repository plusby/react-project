import React,{ useEffect, useState } from 'react'
import { Card, Select, Input, Button, Table    } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { getCommodity } from '../../api/home'
import './index.less'


const { Option, OptGroup } = Select;

export default function Head(props){
    const [column,setColums] = useState([
        {
          title: '名称',
          width: 100,
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
        },
        {
          title: '类别',
          width: 100,
          dataIndex: 'type',
          key: 'type',
        },
        { title: '描述', dataIndex: 'desc', key: 'desc' },
        { title: '地址', dataIndex: 'address', key: 'address' },
        { title: '收货人', dataIndex: 'user', key: 'user' },
        { title: '库存', dataIndex: 'num', key: 'num' },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 160,
          render: () => {
            return (
                <div>
                    <a className="btn" onClick={()=>{goDetail('item')}}>修改数据</a>
                    <a className="btn" onClick={()=>{goDetail('item')}}>查看数据</a>
                </div>
            )
          },
        },
    ])

    const [sourceData, setSourceData] = useState([
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 40,
          address: 'London Park',
        },
      ])
    const [searchVal, setSearchVal] = useState({inputVal: '',selectVal: ''})
    
    const title = (
        <div className="search-wrap">
            <div className="left">
                <Select allowClear style={{ width: 100 }} onSelect={(val)=>{handleChange(val)}}>
                    <Option value="类别1">类别1</Option>
                    <Option value="类别2">类别2</Option>
                </Select>
                <Input placeholder="Basic usage" value={searchVal.inputVal} onChange={onChange} />
                <Button type="primary" onClick={()=>{searchBtn()}}>搜索</Button>
            </div>
            <div className="right">
                <Button icon={<PlusOutlined />} type="primary">添加</Button>
            </div>
        </div>
    )

    const initData = () => {
        getCommodity({type:searchVal.selectVal,name:searchVal.inputVal}).then(res=>{
            console.log('res',res)
            setSourceData(res.data.msg)
        })
    }

    // 进入详情
    const goDetail = (item) => {
        props.history.push('/admin/commodityManage/commodityManageDetail')
    }

    const handleChange = (val) => {
        setSearchVal({...searchVal,selectVal: val})
    }

    function onChange(e){
        setSearchVal({...searchVal,inputVal: e.target.value})
    }

    const searchBtn = () => {
        initData()
    }

    useEffect(() => {
        initData()
    }, [])

    return (
        <div>   
            <Card title={title} bordered={false} style={{ width: '100%' }}>
                <Table 
                    columns={column} 
                    dataSource={sourceData} 
                    scroll={{ x: 1300 }}
                    pagination={{
                        pageSize: 5
                    }}
                />
            </Card>
        </div>
    )
}