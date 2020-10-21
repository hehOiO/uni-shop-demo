import Vue from 'vue'
import App from './App'
import store from '@/store'
import fetchTool from './common/lib/fetchTool.js'
import userService from './common/lib/userService.js'
import loadMore from './components/load-more.vue'

Vue.config.productionTip = false
Vue.prototype.$store   = store
Vue.prototype.$Request = fetchTool.Request; 
Vue.prototype.$Request1 = fetchTool.Request1; 
Vue.prototype.$Cache   = fetchTool.cache; 
Vue.prototype.$Sysconf = fetchTool.config; 
Vue.prototype.$NavTarge = fetchTool.JumpTargeLink;
Vue.prototype.$SysUser = userService;
Vue.prototype.$uploadFile = fetchTool.uploadFile; 
Vue.prototype.$eventBus=new Vue()
App.mpType = 'app'

import cuCustom from './colorui/components/cu-custom.vue'//引入自定义导航栏
Vue.component('cu-custom',cuCustom)

import blank from './colorui/components/blank.vue'//引入空白页
Vue.component('blank',blank)

import bottomLine from './colorui/components/bottom-line.vue'//引入自定义底线
Vue.component('bottom-line',bottomLine)

Vue.component('load-more',loadMore)

const app = new Vue({
  store,
  ...App
})
app.$mount()
