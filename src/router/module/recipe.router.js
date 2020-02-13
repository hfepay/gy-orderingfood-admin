const moduleName = '/recipe'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '菜品', icon: 'tree-table' },
  children: [
    {
      path: 'recipeManagement',
      name: 'recipeManagement',
      component: () => import(`@/views${moduleName}/recipeManagement`),
      meta: { title: '菜品管理' }
    }
  ]
}]
export default router
