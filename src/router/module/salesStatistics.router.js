const moduleName = '/salesStatistics'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '销售统计', icon: 'tree-table' },
  children: [
    {
      path: 'salesSummary',
      name: 'SalesSummary',
      component: () => import(`@/views${moduleName}/salesSummary`),
      meta: { title: '销售概括' }
    }
  ]
}]
export default router
