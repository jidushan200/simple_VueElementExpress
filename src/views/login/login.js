// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import progressbar from 'vue-progressbar';
// UI框架Element
import vuecookie from 'vue-cookie'
import i18n from "@/i18n";
import rule from '@/rule';
import Login from './Login.vue'

Vue.use(progressbar, {
  color: '#bffaf3',
  failedColor: 'red',
  thickness: '3px'
});

Vue.use(vuecookie);
// 全局校验规则
rule.init(i18n);

document.title = i18n.t('lang.mainTitle');
Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  i18n,
  template: '<Login/>',
  components: {
    Login
  }
});
