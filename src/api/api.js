import axios from '@/utility/request'
import baseConfig from '@/api/config'
const { api } = baseConfig;

/**
 * api配置项
 * */
export function API(apikey, param, queryData,key){
  const reqconfig = api[apikey];
  const params = param || '';
  const data = queryData || {};
  let url = reqconfig.url;
  if(key){
    url = `${reqconfig.url}/${key}`;
  }
  if(reqconfig){
    return new Promise((resolve, reject) => {
      axios({
        ...reqconfig,
        url: url,
        method: reqconfig.method,
        params,
        data
      }).then(res => {
        //根据返回的状态码判断，注意res返回的并不一定都是status，比如小程序就是statusCode
        if (res.status == 200) {
          //这里我们只需要获取返回的data中的数据即可
          resolve(res.data);
        } else {
          reject(res);
        }
      }).catch(err => {
        if(err.response){
          this.$message.error(err.response.data.errorCode);
        }
        reject(err);
      })
    });
  }
  return {
    code: '0',
    desc: `没有找到[${apikey}]对应的请求配置`
  }
}


