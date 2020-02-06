import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
Vue.prototype.axios=axios;

// 过滤器
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
});
// 下拉延迟
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller);
// 等待出现图片,而不是空白屏
import Loading from '@/components/Loading'
Vue.component('Loading',Loading);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
