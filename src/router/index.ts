import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tmp',
      name: 'tmp',
      component: () => import('../views/TmpView.vue')
    },
    {
      path: '/EmblemImbue',
      name: 'EmblemImbue',
      meta: {
        title: '纹章士刻印'
      },
      component: () => import('../views/EmblemImbueView.vue')
    },
    {
      path: '/Weapon',
      name: 'Weapon',
      meta: {
        title: '武器数据'
      },
      component: () => import('../views/WeaponView.vue')
    }
  ]
})

export default router
