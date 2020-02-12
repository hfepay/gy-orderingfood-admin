const moduleName = '/trade'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '业务配置', icon: 'tree-table' },
  children: [
    {
      path: 'employeeDiscount',
      name: 'EmployeeDiscount',
      component: () => import(`@/views${moduleName}/employeeDiscount`),
      meta: { title: '员工折扣' }
    },
    {
      path: 'dishCategory',
      name: 'DishCategory',
      component: () => import(`@/views${moduleName}/dishCategory`),
      meta: { title: '菜品类别' }
    },
    {
      path: 'scheduledDeadline',
      name: 'scheduledDeadline',
      component: () => import(`@/views${moduleName}/scheduledDeadline`),
      meta: { title: '预定截止时间' }
    },
    {
      path: 'dishesList',
      name: 'DishesList',
      component: () => import(`@/views${moduleName}/dishesList`),
      meta: { title: '菜品清单' }
    }
  ]
}]
export default router
