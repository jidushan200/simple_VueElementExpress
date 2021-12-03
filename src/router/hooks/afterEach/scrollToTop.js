/**
 * 不同页面间的跳转，把视图拉回顶部
 */
import Vue from 'vue'

function trimQS(url) {
  return url ? url.split('?')[0] : '';
}

const scrollToTop = (to, from) => {
  if (trimQS(to.path) !== trimQS(from.path)) {
    let el = document.querySelector('.layout-content-main') || {};
    Vue.scrollTop(el, el.scrollTop, 0);
  }
}

export default scrollToTop
