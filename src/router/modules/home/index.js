const Home = React.lazy(() => import('@/pages/Home/home.js')); // 动态引入

const routes = [
  {
    path: '/home',
    exact: true,
    meta: {
      title: '首页',
      show: true, 
    },
    component: Home,
  },
];

export default routes