import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '*',
    redirect: '/home',
  },
  {
    path: '/twoRow',
    component: () => import('@/views/twoRow.vue'),
  },
  {
    path: '/food',
    component: () => import('@/views/category/food.vue'),
  },
  {
    path: '/tourism',
    component: () => import('@/views/category/tourism.vue'),
  },
  {
    path: '/mood',
    component: () => import('@/views/category/mood.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
