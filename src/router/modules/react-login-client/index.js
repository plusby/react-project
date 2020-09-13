const Login = React.lazy(() => import('@/pages/modules/react-login-client/login/login.js')); // 动态引入

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
];

export default routes
