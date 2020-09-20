import React,{ useEffect, useState} from 'react'
import { Card, Table, Button, Modal, message } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import './index.less'
import { getCategory, addCategory } from '../../api/home'
import FormTable from './components/formTable'

export default function Head(){
    const [category,setCategory ] = useState('0')
    const [addVisible,setAddVisible ] = useState(true)
    const [title, setTile ] = useState('阶段一')
    const [dataSource,setDataSource ] = useState([])
    const [dataSource2,setDataSource2 ] = useState([])
    const [total,setTotal ] = useState(0)
    const [addForm,setAddForm] = useState(null)
    const [ formConfigArr, setFormConfigArr] = useState([
      {
        label: '姓名',
        name: 'name',
        required: true,
        type: 'input',
        default: {},
      },
      {
        label: '描述',
        name: 'desc',
        type: 'select',
        required: true,
        options: [
          {
            label: '12312312',
            val: 0,
          },
          {
            label: '454545',
            val: 1,
          }
        ],
        default: {},

      }
    ])
      
    const columns = [
        {
          title: '名称',
          width: 300,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '作用',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          width: 200,
          render: (tags,item) => {
              return (
                  <>
                    <span className="btn">修改数据</span> 
                    {
                      category === '0' && <span className="btn last-btn" onClick={()=>{ goChildren(item)}}>子数据</span>
                    }
                  </>
              )
          }
        },
    ];
    const initData = () => {
        console.log('category',category)
        getCategory({page:1,category}).then(res=>{
            console.log(res.data.msg,res.data.total)
            if(res.data.status === 0){
              if (category === '0') {
                setDataSource([...res.data.msg])
              } else {
                setDataSource2([...res.data.msg])
              }
              
              console.log('dataSource',dataSource)
              setTotal(res.data.total)
            }
        })
    }
    
    useEffect(()=>{
        initData()
    },[category])

    // 页码
    const pageChange = (page) => {
      console.log(page)
    }

    // 子数据
    const goChildren = (item) => {
      setCategory('2')
      setTile(<p className='nav'><span className='btn' onClick={goOne}>阶段一</span><RightOutlined /><span>阶段二</span></p>)
    }

    // 阶段一
    const goOne = () => {
      setTile(<p className='nav'><span>阶段一</span></p>)
      setCategory('0')
    }

    // 确定添加数据
    const addHandleOk = () => {
      addForm.validateFields().then(async vals=>{
        console.log('vals',vals)
        addCategory({
          name: vals.name,
          desc: vals.desc,
        }).then(res=>{
          console.log(res)
          if(res.data.status === '0'){
            setCategory('0')
            initData()
            setAddVisible(false)
          }
        },err=>{
          setAddVisible(false)
          message.error('添加失败');
        })
      })
    }

    // 获取到添加数据的form对象
    const getAddForm = (form) => {
      setAddForm(form)
    }
    
    return (
        <div className='category-box'>
          {
            console.log('dataSource',dataSource,total)
          }
            <Card title={title} extra={<Button type='primary' onClick={()=>{setAddVisible(true)}} icon={<PlusOutlined />}>添加数据</Button>} style={{ width: '100%' }}>
                <Table
                  rowKey={record => { 
                    console.log('record',record) 
                    return record.id + Math.random()*10
                  }}
                  dataSource={ category !== '0' ? [...dataSource2]:[...dataSource]} 
                  columns={columns}
                  bordered
                  pagination={{
                    pageSize: 5,
                    total:total,
                    showQuickJumper:true,
                    onChange: pageChange
                  }}
                />
            </Card>
            {/* 添加数据 */}
            <Modal
              title="添加数据"
              visible={addVisible}
              onOk={addHandleOk}
              onCancel={()=>{setAddVisible(false)}}
            >
              <FormTable formConfigArr={formConfigArr} setForm={getAddForm} />
            </Modal>
        </div>
    )
}