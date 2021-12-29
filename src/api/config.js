
// const api = 'http://122.4.193.124:57301/api';
const apiURL = '/api';

const baseConfig = {
  /**
   * api配置项
   * */
  api: {
    //登录接口
    login: { url: `${apiURL}/auth/login` , method: 'post' },

  }
};

export default baseConfig;
