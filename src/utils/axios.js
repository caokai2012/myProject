import axios from 'axios'
import Vue from 'vue'
import {LoadingBar,Message} from 'iview'

LoadingBar.config({color: '#4FDAFF', failedColor: '#f40', height: 4});
axios.interceptors.request.use(config => {
  LoadingBar.start();
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.resolve(err.response)
})
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'; //跨域
// axios.defaults.headers['Cache-Control'] = 'max-age=120000'; //缓存
axios.defaults.withCredentials = false; //自动上传浏览器cookic,本地false，线上true
function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  let err = {
    status: -404,
    msg: '网络异常'
  };
  if (response && response.status) {
    switch (response.status) {
      case 400:
        err.msg = '错误请求'
        break;
      case 401:
        err.msg = '未授权，请重新登录'
        break;
      case 403:
        err.msg = response.data.Msg
          ? `错误：${response.data.Msg},请重新登录`
          : '拒绝访问';
        setTimeout(() => {
          // Win10_child.close();
          window.location.replace('/');
        }, 3000);
        break;
      case 404:
        err.msg = '请求错误,未找到该资源'
        break;
      case 405:
        err.msg = '请求方法未允许'
        break;
      case 408:
        err.msg = '请求超时'
        break;
      case 500:
        err.msg = '服务器端出错'
        break;
      case 501:
        err.msg = '网络未实现'
        break;
      case 502:
        err.msg = '网络错误'
        break;
      case 503:
        err.msg = '服务不可用'
        break;
      case 504:
        err.msg = '网络超时'
        break;
      case 505:
        err.msg = 'http版本不支持该请求'
        break;
      default:
        err.msg = `连接错误${err.response.status}`
    }
  } else {
    err.msg = "连接到服务器失败"
  }
  // 异常状态下，把错误信息返回去
  return err;
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    LoadingBar.finish();
    // return Promise.reject(res);
    return res;
  }
  if (!res.success) {
    LoadingBar.finish();
    // return Promise.reject(res);
    return res;
  }
  setTimeout(() => {
    LoadingBar.finish();
  }, 800);
  return res
}

export default {
  post(url, data) {
    return axios({
      method: 'post', url, data: data, timeout: 500000, // 防止请求被 canceled
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  get(url, params) {
    return axios({
      method: 'get', url, params, // get 请求时带的参数
      timeout: 500000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  }
}
