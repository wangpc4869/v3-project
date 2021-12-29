import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import user from './modules/user'
import table from './modules/table'

Vue.use(Vuex);

// 应用初始状态
const store = new Vuex.Store({
  modules: {
    user,
    table
  },
  getters
});

// 创建 store 实例
export default store
