/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
// import QS from 'qs';
// import store from '@/store/index';
// import router from "@/router";


// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//   axios.defaults.baseURL = 'http://58.58.64.134:57301';
// } else if (process.env.NODE_ENV == 'debug') {
//   axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseURL = 'http://58.58.64.134:57301';
// }
// 请求超时时间
axios.defaults.timeout = 30000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//让 axios 携带cookie
axios.defaults.withCredentials=false;

// 请求拦截器
// axios.interceptors.request.use(
//   config => {
//     // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//     const token = store.state.token;
//     token && (config.headers.Authorization = token);
//     return config;
//   },
//   error => {
//     return Promise.error(error);
//   });

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  (err) => { // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误';
          break;
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          // err.message = '未授权，请登录';
          // store.commit('LogOut');
          // router.replace({
          //   path: '/login',
          // });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          // err.message = '用户信息过期，从新登录';
          // // 清除token
          // store.commit('LogOut');
          // router.replace({
          //   path: '/login',
          // });
          break;
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器内部错误';
          break;
        case 501:
          err.message = '服务未实现';
          break;
        case 502:
          err.message = '网关错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网关超时';
          break;
        case 505:
          err.message = 'HTTP版本不受支持';
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    }else {
      // 跨域获取不到状态码或者其他状态码进行的处理
      err.message = '网络出现问题，请稍后重试'
    }
    return Promise.reject(err)
  }
);

export default axios
