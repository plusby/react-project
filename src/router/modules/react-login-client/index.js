const Login = React.lazy(() => import('@/pages/modules/react-login-client/pages/login/login.js')); // 动态引入
const Admin = React.lazy(() => import('@/pages/modules/react-login-client/pages/admin/admin.js')); 

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
  },
];

export default routes
