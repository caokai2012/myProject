import VueRouter from 'vue-router'
import routes from './routes'

export default () => {
  return new VueRouter({
    routes,
    mode:'hash',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // 保存上次页面滚动的位置
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
  })
}
