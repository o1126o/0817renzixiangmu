import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 导入所有的路由模块
import approval from '@/router/modules/approval'
import attendance from '@/router/modules/attendance'
import department from '@/router/modules/department'
import employee from '@/router/modules/employee'
import permission from '@/router/modules/permission'
import role from '@/router/modules/role'
import salary from '@/router/modules/salary'
import social from '@/router/modules/social'
// import dashboard from '@/router/modules/dashboard'

export const MyRoutes = [
  department,
  role,
  employee,
  permission,
  attendance,
  approval,
  salary,
  social
]

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // ...MyRoutes,

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
