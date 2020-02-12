const moduleName = '/order'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '订单管理', icon: 'tree-table' },
  children: [
    {
      path: 'orderDetail',
      name: 'OrderDetail',
      component: () => import(`@/views${moduleName}/orderDetail`),
      meta: { title: '订单明细' }
    },
    {
      path: 'orderStatistics',
      name: 'OrderStatistics',
      component: () => import(`@/views${moduleName}/orderStatistics`),
      meta: { title: '订单统计' }
    }
  ]
}]
export default router
