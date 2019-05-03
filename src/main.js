// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import createStore from './store'
import fasClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'babel-polyfill'
import 'swiper/dist/css/swiper.css'
import layer from 'vue2-layer-mobile'
import '@/assets/styles/reset.css'
import '@/assets/styles/border.css'
import axios from 'axios'
import '@/assets/iconfont.js'

Vue.config.productionTip = false

Vue.use(layer)
fasClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
// 创建一个Vuex Store对象
const store = createStore()

axios.defaults.withCredentials = true
Vue.prototype.axios = axios

// 路由守卫，检测是否登录
router.beforeEach((to, from, next) => {
  // 若是前往登录与注册页面
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    // 若未登录，前往登录页面
    if (!store.getters.getUser.uid) {
      console.log(store.getters.getUser.uid)
      next('/login')
    } else { // 若已登录，跳转至目标地址
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
