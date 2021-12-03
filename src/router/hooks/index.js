/**
 * beforeEach 与 afterEach 最显著的区别是后者无法调用任何切换函数，详见：
 * https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/api/before-each.md
 * https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/api/after-each.md
 */
import Vue from 'vue';
import titleInterceptor from './beforeEach/titleInterceptor';
import breadcrumbInterceptor from './beforeEach/breadcrumbInterceptor';
import forceInterceptor from './beforeEach/forceInterceptor';
import authCheck from './beforeEach/authCheck';
// import scrollToTop from './afterEach/scrollToTop'

export default (router) => {
  router.beforeEach(authCheck(router));
  router.beforeEach(titleInterceptor(router));
  router.beforeEach(forceInterceptor(router));
  router.beforeEach(breadcrumbInterceptor(router));
  // router.afterEach(scrollToTop);

  router.beforeEach((to, from, next) => {
    Vue.prototype.$Progress.start();
    next();
  });

  router.afterEach((to, from) => {
    Vue.prototype.$Progress.finish();
  });
}
