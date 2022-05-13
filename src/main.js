import ElementUI from 'element-ui'
import Vue from 'vue'
import Toast from 'vue2-toast'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible/flexible'

Vue.use(Toast, {
  type: 'center',
  duration: 2000,
  wordWrap: true,
  width: '150px',
})
Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
