import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VuelazyLoad from 'vue-lazyload'
// Vue.config.productionTip = false

import 'common/stylus/index.styl'

fastclick.attach(document.body)

router.beforeEach((to, from, next) => {
  // console.log(to.matched)
  // console.log(from)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log('需要验证')
    next()
  } else {
    next() // 确保一定要调用 next()
  }
})
Vue.use(VuelazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
