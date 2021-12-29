import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';

Vue.use(Router);

const router = new Router({
  //去掉地址栏路径中的'#'
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/HelloWorld'
    },
    {
      path: "/HelloWorld",
      name: 'HelloWorld',
      component: resolve => require(['@/view/text/HelloWorld.vue'], resolve),
      meta: {
        title: '测试页面'
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  setTimeout(()=>{
    const isLogin = store.getters.isLogin;
    if (isLogin) {
      next();
    } else {
      //这就是跳出循环的关键
      if (to.path === '/login') {
        next();
      } else {
        // store.dispatch('LogOut');
        // next('/login');
        next();
      }
    }
  },500)
});

export default router;