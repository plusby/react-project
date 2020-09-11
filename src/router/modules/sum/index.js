const Sum = React.lazy(() => import('@/pages/modules/sum/sum-home.js')); // 动态引入

const routes = [
  {
    path: '/sum',
    exact: true,
    meta: {
      title: '资产',
      show: true, 
    },
    component: Sum,
  },
];

export default routes