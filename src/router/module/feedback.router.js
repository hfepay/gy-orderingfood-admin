const moduleName = '/feedback'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '问题反馈', icon: 'tree-table' },
  children: [
    {
      path: 'feedback',
      name: 'Feedback',
      component: () => import(`@/views${moduleName}/feedback`),
      meta: { title: '问题反馈' }
    }
  ]
}]
export default router
