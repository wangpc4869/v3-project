import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import axios from 'axios';
import echarts from 'echarts';
import { API } from '@/api/api';

Vue.config.productionTip = false;

// 注册
Vue.use(Element);
// Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$API = API;

// 注册全局组件
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
