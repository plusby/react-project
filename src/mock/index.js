//引入mockjs
import Mock,{ Random } from 'mockjs'
//使用mockjs模拟数据

// 登录接口
Mock.mock('/api/login','post', {
    "status":0,
    "msg":
      {
        "name": 'admin',
        "id": Mock.Random.id(),//随机生成1-800的数字
        "nickname": "@cname",//随机生成中文名字
      }
});

// 获取左侧导航配置
Mock.mock('/api/navLeft','get', {
  "status":0,
  "msg":
    [
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
});


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