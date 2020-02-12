const moduleName = '/member'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '会员管理', icon: 'tree-table' },
  children: [
    {
      path: 'memberManagement',
      name: 'MemberManagement',
      component: () => import(`@/views${moduleName}/memberManagement`),
      meta: { title: '会员管理' }
    }
  ]
}]
export default router
