import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '*',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/add',
    component: () => import('@/views/add.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/mine',
    component: () => import('@/views/mine.vue'),
    meta: {
      keepAlive: false,
    },
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach(async (to, from, next) => {
  next()
  const token = sessionStorage.getItem('TOKEN')
  if (token) {
    if (to.path === '/login') {
      next('/')
    }
  } else if (to.path === '/mine') {
    next('/login')
  }
})

export default router
