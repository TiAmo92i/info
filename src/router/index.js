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
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: {
      keepAlive: false,
    },
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  next()
  const token = sessionStorage.getItem('TOKEN')
  if (token) {
    if (to.path === '/login') {
      next('/')
    }
  }
})
export default router
