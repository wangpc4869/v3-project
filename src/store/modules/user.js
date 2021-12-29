import { setStore, removeStore } from '@/utility/store'

const user = {
    namespaced:true,
    state: {
      isLogin:false,
      userInfo:{},
        username:'user'
    },
    mutations: {
      SET_USERINFO: (state, userInfo) => {
        state.isLogin = true;
        state.userInfo = userInfo;
      },
      CLEAR_USER: (state) => {
        state.isLogin = false;
        state.userInfo = {};
        removeStore({
            name: 'userMsg'
        });
      }
    },
    actions: {
        async Login({ commit, state }, user) {
            return new Promise((resolve) => {
                commit('SET_USERINFO', user);
                setStore({
                    name: 'userMsg',
                    type: 'session',
                    content: state
                });
                resolve()
            })
        },
        LogOut({ commit },) {
            return new Promise((resolve) => {
                commit('CLEAR_USER');
                resolve()
            })
        },
        ceshi(){
            console.log('执行了user测试函数')
        }
    }
}

export default user
