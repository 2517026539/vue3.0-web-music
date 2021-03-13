import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const recommend = () => import('@/views/recommend/index.vue')
const playlists = () => import('@/views/playlists/index.vue')
const rank = () => import('@/views/rank/index.vue')
const singer = () => import('@/views/singer/index.vue')
const lastestMusic = () => import('@/views/lastestMusic/index.vue')
const video = () => import('@/views/video/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/recommend',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'recommend',
        name: 'Recommend',
        component: recommend
      },
      {
        path: 'playlists',
        name: 'Playlists',
        component: playlists
      },
      {
        path: 'rank',
        name: 'Rank',
        component: rank
      },
      {
        path: 'singer',
        name: 'Singer',
        component: singer
      },
      {
        path: 'lastestmusic',
        name: 'LastestMusic',
        component: lastestMusic
      },
      {
        path: 'video/:id',
        name: 'video',
        components: {
          video: video
        },
        meta: { test: '小贤我想你' }
      },
      {
        path: 'testmain',
        name: 'TestMain',
        component: () => import('@/views/test/TestMain.vue'),
        meta: {
          isCover: true
        }
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
