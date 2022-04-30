import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '*',
    redirect: '/home',
  },
  {
    path: '/twoRow',
    component: () => import('@/views/twoRow.vue'),
    meta: {
      keepAlive: false,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
