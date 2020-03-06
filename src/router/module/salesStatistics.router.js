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
      meta: { title: '结算报表' }
    },
    {
      path: 'dailyStatistics',
      name: 'DailyStatistics',
      component: () => import(`@/views${moduleName}/dailyStatistics`),
      meta: { title: '销售日统计' }
    },
    {
      path: 'businessAnalysis',
      name: 'BusinessAnalysis',
      component: () => import(`@/views${moduleName}/businessAnalysis`),
      meta: { title: '经营分析报表' }
    },
    {
      path: 'transactionDetails',
      name: 'TransactionDetails',
      component: () => import(`@/views${moduleName}/transactionDetails`),
      meta: { title: '交易流水明细' }
    }

  ]
}]
export default router
