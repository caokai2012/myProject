// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import createRouter from './router'
import createStore from './store'
import iView from 'iview'
import VueLazyload from 'vue-lazyload'
import 'iview/dist/styles/iview.css';
import 'animate.css';
import "../static/css/hover.css";
import 'lib-flexible';
//全局引入api接口
import {request} from 'api/api'
Vue.use(iView);
Vue.use(VueRouter);
Vue.use(Vuex);
const router = createRouter()
const store = createStore()
// 全局 导航守卫
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});
// 声明使用 图片懒加载
Vue.use(VueLazyload, {
  attempt: 1,
  error:'../static/img/404.png',
  loading: require('../static/img/32.jpeg')
})
Vue.prototype.$http = request;
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
