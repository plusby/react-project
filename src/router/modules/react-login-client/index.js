const Login = React.lazy(() => import('@/pages/modules/react-login-client/pages/login/login.js')); // 动态引入
const Admin = React.lazy(() => import('@/pages/modules/react-login-client/pages/admin/admin.js')); 
const BarChart = React.lazy(() => import('@/pages/modules/react-login-client/pages/bar-chart')); 
const CommodityCategory = React.lazy(() => import('@/pages/modules/react-login-client/pages/commodity-category')); 
const LineChart = React.lazy(() => import('@/pages/modules/react-login-client/pages/line-chart')); 
const LoginHme = React.lazy(() => import('@/pages/modules/react-login-client/pages/login-home')); 
const PieChart = React.lazy(() => import('@/pages/modules/react-login-client/pages/pie-chart')); 
const RoleManage = React.lazy(() => import('@/pages/modules/react-login-client/pages/role-manage')); 
const UserManage = React.lazy(() => import('@/pages/modules/react-login-client/pages/user-manage')); 
const CommodityManage = React.lazy(() => import('@/pages/modules/react-login-client/pages/commodity-manage')); 
const commodityManageDetail = React.lazy(() => import('@/pages/modules/react-login-client/pages/commodity-manage/details')); 
const commodityManageAdd = React.lazy(() => import('@/pages/modules/react-login-client/pages/commodity-manage/add'));  

const routes = [
  {
    path: '/clientHome',
    exact: true,
    meta: {
      title: '管理系统',
      show: true,
    },
    component: Login,
  },
  {
    path: '/admin',
    exact: true,
    meta: {
      title: '管理系统',
      show: true,
    },
    component: Admin,
    children: [
      {
        path: '/admin/loginHme',
        exact: true,
        meta: {
          title: '首页',
          show: true,
        },
        component: LoginHme,
      },
      {
        path: '/admin/barChart',
        exact: true,
        meta: {
          title: '柱状图',
          show: true,
        },
        component: BarChart,
      },
      {
        path: '/admin/commodityCategory',
        exact: true,
        meta: {
          title: '品类管理',
          show: true,
        },
        component: CommodityCategory,
      },
      {
        path: '/admin/commodityManage',
        exact: true,
        meta: {
          title: '商品管理',
          show: true,
        },
        component: CommodityManage,
        children: [
          {
            path: '/admin/commodityManage/commodityManageDetail',
            exact: true,
            meta: {
              title: '商品管理详情',
              show: true,
            },
            component: commodityManageDetail,
          },
          {
            path: '/admin/commodityManage/commodityManageAdd',
            exact: true,
            meta: {
              title: '商品管理添加',
              show: true,
            },
            component: commodityManageAdd,
          },
        ]
      },
      {
        path: '/admin/lineChart',
        exact: true,
        meta: {
          title: '折线图',
          show: true,
        },
        component: LineChart,
      },
      
      {
        path: '/admin/pieChart',
        exact: true,
        meta: {
          title: '饼图',
          show: true,
        },
        component: PieChart,
      },
      {
        path: '/admin/roleManage',
        exact: true,
        meta: {
          title: '角色管理',
          show: true,
        },
        component: RoleManage,
      },
      {
        path: '/admin/userManage',
        exact: true,
        meta: {
          title: '用户管理',
          show: true,
        },
        component: UserManage,
      },
    ]
  },
  
];

export default routes
