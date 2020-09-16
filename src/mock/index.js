//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据

// 登录接口
Mock.mock('/api/login','post', {
    "status":0,
    "msg":
      {
        "name": 'admin',
        "id|10": 10,//随机生成1-800的数字
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