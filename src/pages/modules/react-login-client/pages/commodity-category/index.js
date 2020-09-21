import React,{ useEffect, useState} from 'react'
import { Card, Table, Button, Modal, message } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import './index.less'
import { getCategory, addCategory, changeCategory } from '../../api/home'
import FormTable from './components/formTable'

export default function Head(){
    const [category,setCategory ] = useState('0')
    const [addVisible,setAddVisible ] = useState(false)
    const [changeVisible,setChangeVisible ] = useState(false)
    const [title, setTile ] = useState('阶段一')
    const [dataSource,setDataSource ] = useState([])
    const [dataSource2,setDataSource2 ] = useState([])
    const [total,setTotal ] = useState(0)
    const [total2,setTotal2 ] = useState(0)
    const [addForm,setAddForm] = useState(null)
    const [changeForm,setChangeForm] = useState(null)
    const [changeItem,setChangeItem] = useState(null)
    const [ formConfigArr, setFormConfigArr] = useState([
      {
        label: '姓名',
        name: 'name',
        required: true,
        type: 'input',
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
      }
    ])
      
    const [ formChangeConfigArr, setFormChangeConfigArr] = useState([
      {
        label: '姓名',
        name: 'name',
        required: true,
        type: 'input',
        defaultVal: {},
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
        defaultVal: {},
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
                    <span className="btn" onClick={()=>{ changeBtn(item)}}>修改数据</span> 
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
                setTotal(res.data.total)
              } else {
                setDataSource2([...res.data.msg])
                setTotal2(res.data.total)
              }
              
             
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
            message.success('添加成功')
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
    
    // 获取到修改数据的form对象
    const getChangeForm = (form) => {
      setChangeForm(form)
    }

    // 修改数据确认
    const changeHandleOk = () => {
      changeForm.validateFields().then(async vals=>{ 
        console.log(vals)
        changeItem
        changeCategory({id:changeItem.id,...vals}).then(res=>{
          console.log(res)
          message.success('修改成功')
          setCategory('0')
          initData()
          setChangeVisible(false)
        },err=>{

        })
      })
    }

    // 点击修改数据
    const changeBtn = (item) => {
      console.log(item)
      let  newformChangeConfigArr = formChangeConfigArr
      newformChangeConfigArr[0].defaultVal = item.name
      newformChangeConfigArr[1].defaultVal = item.desc
      setChangeItem(item)
      setFormChangeConfigArr([...newformChangeConfigArr])
      setChangeVisible(true)
    }
    
    return (
        <div className='category-box'>
          {
            console.log('dataSource2',dataSource2,total2)
          }
            <Card title={title} extra={<Button type='primary' onClick={()=>{setAddVisible(true)}} icon={<PlusOutlined />}>添加数据</Button>} style={{ width: '100%' }}>
                <Table
                  rowKey={record => { 
                    console.log('record',record) 
                    return record.id
                  }}
                  dataSource={ category !== '0' ? [...dataSource2]:[...dataSource]} 
                  columns={columns}
                  bordered
                  pagination={{
                    pageSize: 5,
                    total: category !== '0' ? total2 : total,
                    showQuickJumper:true,
                    onChange: pageChange,
                    defaultCurrent: 1
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
            {/* 修改数据 */}
            <Modal
              title="修改数据"
              visible={changeVisible}
              onOk={changeHandleOk}
              onCancel={()=>{setChangeVisible(false)}}
            >
              <FormTable formConfigArr={formChangeConfigArr} setForm={getChangeForm} />
            </Modal>
        </div>
    )
}