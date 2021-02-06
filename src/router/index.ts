import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/testmain',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'testmain',
        name: 'TestMain',
        component: () => import('@/views/test/TestMain.vue')
      },
      {
        path: 'testview',
        name: 'TestView',
        component: () => import('@/views/test/TestView.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/*',
    redirect: '/error',
    name: 'Error',
    component: () => import('@/views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
