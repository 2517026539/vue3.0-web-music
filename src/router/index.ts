import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
