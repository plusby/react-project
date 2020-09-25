import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Modal, message, Tree } from 'antd'
import { getRole, addRole, deleteRole, addPower } from '../../api/home'
import FormTable from '../commodity-category/components/formTable'
import { getStore } from '@/common/utils'
import TreeTemp from './components/tree'
import './index.less'

export default function RoleManage(){

    const [dataSource, setDataSource] = useState([])
    const [addVisible, setAddVisible] = useState(false)
    const [ formConfigArr, setFormConfigArr] = useState([
        {
          label: '角色名',
          name: 'userName',
          required: true,
          type: 'input',
        },
      ])
    const [addForm, setAddForm] = useState({})
    const [selectedRowKeys, setSelectedRowKeys] = useState('')
    const [changeVisible, setChangeVisible ] = useState(false)
    const [treeCheckedKeys, setTreeCheckedKeys] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    
    // 点击确认添加权限
    const changeHandleOkBtn = () => {
        addPower({
            id: selectedRowKeys[0],
            power: treeCheckedKeys,
        }).then(res=>{
            console.log('res',res)
            message.success('操作成功')
            setChangeVisible(false)
            initData()
        })
    }

    const title = (
        <>
            <Button style={{marginRight:'4px'}} type="primary" onClick={()=>{addRoleBtn()}}>添加角色</Button>
            <Button type="primary" disabled={!selectedRowKeys} onClick={()=>{changePowerBtn()}}>修改权限</Button>
        </>
    )

    const initData = () => {
        getRole().then(res=>{
            console.log('res',res)
            if (selectedRowKeys[0]) { // 确定权限之后重新请求到数据重置选中的那条
                setSelectedRows(res.data.msg.filter(val=>val.id === selectedRowKeys[0]))
            }
            setDataSource(res.data.msg)
        })
    }

    // 添加角色
    const addRoleBtn = () => {
        setAddVisible(true)
    }

    // 删除
    const deleteRoleBtn = (val) => {
        console.log(val)
        deleteRole(val.id).then(values => {
            if(values.data.status === 0){
                message.success('删除成功')
                initData()
            }
        })
    }

    // 修改权限
    const changePowerBtn = () => {
        setChangeVisible(true)
    }
      
    const columns = [
        {
          title: '角色名称',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: '授权时间',
          dataIndex: 'time',
          key: 'time',
          render(val){
              return moment(val).format("YYYY-MM-DD");
          }
        },
        {
          title: '授权人',
          dataIndex: 'empower',
          key: 'empower',
        },
        {
            title: '操作',
            key: 'operation',
            render(val,item){
                return (
                    <>
                        <Button type="primary" danger onClick={()=>{deleteRoleBtn(val,item)}}>删除</Button>
                    </>
                )
            }
        }
    ];
    
    // 确认添加数据
    const addHandleOk = () => {
        console.log(addForm)
        addForm.validateFields().then(values => {
            console.log(values)
            addRole({
                userName: values.userName,
                empower: getStore('userInfo').name
            }).then(res=>{
                if(res.data.status === 0){
                    setAddVisible(false)
                    initData()
                }
            },err=>{
                message.error('添加失败')
            })
        })
    }

    const getAddForm = (form) => {
        setAddForm(form)
    }

    // tree选中的时候出发
    const treeCheckedKeysCb = (keys) => {
        console.log(keys)
        setTreeCheckedKeys(keys)
    }


    useEffect(()=>{
        initData()
    },[])

    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRows)
          setSelectedRowKeys(selectedRowKeys)
          setSelectedRows([...selectedRows])
        },
    };
    
    
    return (
        <div>
            <Card title={title}  style={{ width: '100%' }}>
                <Table 
                    rowKey='id' 
                    rowSelection={{
                        type: 'radio',
                        ...rowSelection,
                    }} 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={{pageSize:5}} />
            </Card>
            {/* 添加数据 */}
            <Modal
              title="添加数据"
              visible={addVisible}
              onOk={addHandleOk}
              onCancel={()=>{setAddVisible(false)}}
            >
              <FormTable 
                formConfigArr={formConfigArr} 
                setForm={getAddForm} />
            </Modal>
            {/* 修改权限 */}
            <Modal
              destroyOnClose
              title="修改权限"
              visible={ changeVisible }
              onOk={changeHandleOkBtn}
              onCancel={()=>{setChangeVisible(false)}}
            >
                <TreeTemp treeCheckedKeysCb={treeCheckedKeysCb} defaultSelectedKeys={(selectedRows[0] && selectedRows[0].power) || []} />
            </Modal>
        </div>
    )
}