//引入mockjs
import Mock,{ Random } from 'mockjs'
//使用mockjs模拟数据


let navList = [
  {
    title: '首页',
    icon: 'BankOutlined',
    page: '/admin/loginHme'
  },
  {
    title: '商品',
    icon: 'BlockOutlined',
    children: [
      {
        title: '品类管理',
        icon: 'ClusterOutlined',
        page: '/admin/commodityCategory'
      },
      {
        title: '商品管理',
        icon: 'ContainerOutlined',
        page: '/admin/commodityManage'
      }
    ]
  },
  {
    title: '用户管理',
    icon: 'TeamOutlined',
    page: '/admin/userManage'
  },
  {
    title: '角色管理',
    icon: 'UserSwitchOutlined',
    page: '/admin/roleManage'
  },
  {
    title: '图形报表',
    icon: 'SmileOutlined',
    children: [
      {
        title: '柱状图',
        icon:'BarChartOutlined',
        page: '/admin/barChart'
      },
      {
        title: '折线图',
        icon: 'LineChartOutlined',
        page: '/admin/lineChart'
      },
      {
        title: '饼图',
        icon: 'PieChartOutlined',
        page: '/admin/pieChart'
      }
    ]
  }
]





// 品类数据
let category = Mock.mock([
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id(),
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  }
])

let category2 = Mock.mock([
  {
    "id": Mock.Random.id()+ Math.random() *10,
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id()+ Math.random() *10,
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id()+ Math.random() *10,
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id()+ Math.random() *10,
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id()+ Math.random() *10,
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id()+ Math.random() *10,
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id()+ Math.random() *10,
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  },
  {
    "id": Mock.Random.id()+ Math.random() *10,
    'name': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10)
  }
])

// 获取 品类数据
Mock.mock(new RegExp('/api/getCategory.*'),'get', (options)=>{
  console.log('options',options)
  const result = options.url.split('?')[1]
  const arr = result.split('&')
  let params = {}
  arr.forEach(item=>{
    const val = item.split('=')
    params[val[0]] = val[1]
  })
  console.log('options222',params)
  if(params.category === '2') { // 第二阶段
    return {
      "status":0,
      "total": category2.length,
      "msg":category2
    }
  } else if(params.category === '0') { // 第一阶段
    return {
      "status":0,
      "total": category.length,
      "msg": category
    }
  }
});

// 添加品类数据
Mock.mock('/api/addCategory','post', (options)=>{
  console.log(options)
  const data = JSON.parse(options.body)
  category.push(Mock.mock({
    "id": Mock.Random.id(),
    name: data.name,
    desc: data.desc
  }))
  return {
    "status": '0',
  }
})

// 修改 品类数据
Mock.mock(new RegExp('/api/changeCategory.*'),'post', (options)=>{
  console.log('options',options)
  const data = JSON.parse(options.body)
  category = category.map(item=>{
    if(item.id === data.id){
      item.name = data.name
      item.desc = data.desc
    }
    return item
  })
  return {
    "status":0
  }
});

// 商品
let commodity = Mock.mock([
  {
    "id": Mock.Random.id(),
    'user': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10),
    'type': '类别'+ Math.floor(Math.random() *10),
    'address': Random.csentence(5, 10),
    'name': Random.csentence(5, 10),
    'num': Math.random() *1000,
  },
  {
    "id": Mock.Random.id(),
    'user': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10),
    'type': '类别'+ Math.floor(Math.random() *10),
    'address': Random.csentence(5, 10),
    'name': Random.csentence(5, 10),
    'num': Math.random() *1000,
  },
  {
    "id": Mock.Random.id(),
    'user': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10),
    'type': '类别'+ Math.floor(Math.random() *10),
    'address': Random.csentence(5, 10),
    'name': Random.csentence(5, 10),
    'num': Math.random() *1000,
  },
  {
    "id": Mock.Random.id(),
    'user': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10),
    'type': '类别'+ Math.floor(Math.random() *10),
    'address': Random.csentence(5, 10),
    'name': Random.csentence(5, 10),
    'num': Math.random() *1000,
  },
  {
    "id": Mock.Random.id(),
    'user': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10),
    'type': '类别'+ Math.floor(Math.random() *10),
    'address': Random.csentence(5, 10),
    'name': Random.csentence(5, 10),
    'num': Math.random() *1000,
  },
  {
    "id": Mock.Random.id(),
    'user': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10),
    'type': '类别'+ Math.floor(Math.random() *10),
    'address': Random.csentence(5, 10),
    'name': Random.csentence(5, 10),
    'num': Math.random() *1000,
  },
  {
    "id": Mock.Random.id(),
    'user': "@cname",//随机生成中文名字
    'desc': Random.csentence(5, 10),
    'type': '类别'+ Math.floor(Math.random() *10),
    'address': Random.csentence(5, 10),
    'name': Random.csentence(5, 10),
    'num': Math.random() *1000,
  },
])

// 获取商品数据
Mock.mock(new RegExp('/api/getCommodity.*'),'get', (options)=>{
  
  const arr = options.url.split('?')[1].split('&')
  let params = {}
  arr.forEach(item=>{
    const val = item.split('=')
    params[val[0]] = val[1]
  })
  const {name, type} = params
  let result = []
  console.log('options',options,name,type)
  if(name && type){
    result = commodity.filter(item=>{
      return item.type === type && item.name === name
    })
  }
  if(!name && type){
    result = commodity.filter(item=>{
      return item.type === type
    })
  }
  if(name && !type){
    result = commodity.filter(item=>{
      return item.name === name
    })
  }
  if(!name && !type){
    result = commodity
  }
  return {
    "status":0,
    "msg": result
  }
});

// 角色
let role = [
  {
    id: Mock.Random.id(),
    userName: '哈哈',
    time: new Date().getTime() - 10000,
    empower: 'admin'
  },
  {
    id: Mock.Random.id(),
    userName: '哈哈2',
    time: new Date().getTime() - 10000,
    empower: 'admin'
  },
  {
    id: Mock.Random.id(),
    userName: 'admin',
    time: new Date().getTime() - 10000,
    empower: 'admin',
    power: 'all'
  },
]

Mock.mock(new RegExp('/api/getRole.*'),'get', (options)=>{
  return {
    "status":0,
    "msg": role
  }
});

// 添加角色
Mock.mock(new RegExp('/api/addRole.*'),'post', (options)=>{
  console.log('options',options)
  const data = JSON.parse(options.body)
  role.push(Mock.mock({
    id: Mock.Random.id(),
    userName: data.userName,
    time: new Date().getTime(),
    empower: data.empower
  }))
  return {
    "status":0,
    "msg": role
  }
});

// 删除角色
Mock.mock(new RegExp('/api/deleteRole.*'),'get', (options)=>{
  console.log('options',options)
  const arr = options.url.split('?')[1].split('&')
  let params = {}
  arr.forEach(item=>{
    const val = item.split('=')
    params[val[0]] = val[1]
  })
  const { id } = params
  role = role.filter(item=>{
    return item.id !== id
  })
  return {
    "status":0,
    "msg": role
  }
});

// 给角色添加权限
Mock.mock(new RegExp('/api/addPower.*'),'post', (options)=>{
  console.log('options',options)
  const data = JSON.parse(options.body)
  role = role.map(item =>{
    if(item.id === data.id){
      item.power = data.power
    }
    return item
  })
  return {
    "status":0,
    "msg": role
  }
});

// 登录接口
Mock.mock(new RegExp('/api/login.*'),'post', options=>{
  console.log('options',options)
  const data = JSON.parse(options.body)
  const user = role.filter(item=>{
    return data.userName === item.userName
  })
  console.log('user',user,role)
  return {
    "status":0,
    "msg": user[0]
  }
  
});

// 获取左侧导航配置
Mock.mock(new RegExp('/api/navLeft.*'),'get',(options)=>{
  const result = options.url.split('?')[1]
  const arr = result.split('&')
  let params = {}
  arr.forEach(item=>{
    const val = item.split('=')
    params[val[0]] = val[1]
  })
  console.log('params',params)
  const roleItem = role.filter(item =>{
    return item.id === params.id
  })
  console.log('roleItem',roleItem)
  const newnavList = getNav(navList,roleItem[0].power,[])
  console.log(newnavList)
  return {
    "status":0,
    "msg": newnavList
  }
});

function getNav(origin,roleItem,target){
  if(roleItem === 'all'){
    return origin
  }
  origin.forEach((item)=>{
    if(item.children){
      const children = getNav(item.children,roleItem,[])
      if(children.length){
        item ={
          ...item,
          children: children,
        }
        target.push(item)
      }
    }else{
      roleItem.forEach(val=>{
        if(item.page === val){
          target.push(item)
        }
      })
    }
    
  })
  return target
}