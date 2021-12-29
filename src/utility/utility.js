/**
 * @description 设置时间格式
 * @param  date - 日期
 * @param {string} fmt - 时间格式  例：'yyyy-MM-dd hh:mm:ss'
 */
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

/**
 * @description 获取今天之前的时间段
 * @param {int} day - 天数
 * @param {string} fmt - 时间格式  例：'yyyy-MM-dd hh:mm:ss'
 * reverse() - 数组倒叙
 */
export const time_quantum =  (day,fmt) => {
  return [...Array(day).keys()].map(days => {
    let t = new Date(Date.now() - 86400000 * days);
    return formatDate(t, fmt);
  });
};
/**
 * @description 获取今天之前的星期时间段
 * @param {int} day - 天数
 * @param {array} arr - 定义week格式  例：["周日", "周一", "周二","周三","周四", "周五","周六"]
 * reverse() - 数组倒叙
 */
export const week_quantum  = (day,arr) =>{
  return [...Array(day).keys()].map(days => {
    let week = arr;
    let t = new Date(Date.now() - 86400000 * days);
    let day = t.getDay();//获取星期
    return week[day];
  });
};
//切换月份
// let dateValue = formatDate(this.dateValue, 'yyyy-MM-dd');
// let date = change_date(dateValue,type);
/**
 * @description 切换月份
 * @param {string} date - 日期 注：仅支持formatDate(date, 'yyyy-MM-dd')
 * @param {string} type - 操作方式  注：'prev' - 上一个月  'next' - 下一个月
 */
export const change_date = (date,type) => {
  let arr = date.split('-');
  let year = arr[0]; //获取当前日期的年份
  let month = arr[1]; //获取当前日期的月份
  let day = arr[2]; //获取当前日期的日
  // eslint-disable-next-line no-unused-vars
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  let year2 = year;
  let month2 = null;
  if(type === 'prev'){
    //切换上一个月
    month2 = parseInt(month) - 1;
    if (month2 === 0) {
      year2 = parseInt(year2) - 1;
      month2 = 12;
    }
  }else if(type === 'next'){
    //切换下一个月
    month2 = parseInt(month) + 1;
    if (month2 === 13) {
      year2 = parseInt(year2) + 1;
      month2 = 1;
    }
  }

  let day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }

  return year2 + '-' + month2 + '-' + day2;
};

//时间补零
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}

/**
 * @description 导出Excel文件
 * @param {string} nameStr - 导出名称
 * @param {json} data - json 数据
 * @param {array} keyArr - json key值
 * @param {string} fileName - Excel文件名称
 */

export const export_excel = (nameStr,data,keyArr,fileName) =>{

  let str = '\uFEFF' + nameStr+'\n';

  for(let item of data){
    keyArr.forEach((value) =>{
      str += `${(item[value]) ? item[value] : '' + '\t'},`;
    });
  }

  let csvData = new Blob([str], { type: 'application/ms-excel' });// "text/csv" });
  let csvUrl = URL.createObjectURL(csvData);

  //通过创建a标签实现
  var link = document.createElement('a');

  link.href = csvUrl;

  // 获取当前时间
  let time = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  // 对下载的文件命名
  link.download = fileName + time+ '.xls';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

