// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./assets/styles/index.css"
import Vue from 'vue'
import App from './App'
import store from './store'
import "./utils/index";
import progressbar from 'vue-progressbar';
import router from './router'
// import './router/hooks/beforeEach/authCheck'
import ElementUI from 'element-ui'
import VueCookie from 'vue-cookie';
import i18n from "./i18n"; // 国际化
import rule from './rule'; // 校验规则
import iComponents from './components';

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueCookie);

Vue.use(progressbar, {
  color: 'rgb(34, 153, 221)',
  failedColor: 'red',
  thickness: '3px'
});

Vue.use(iComponents);
// 修改element-dialog默认配置
ElementUI.Dialog.props.closeOnClickModal.default = false;
// form表单label位置默认设置
ElementUI.Form.props.labelPosition.default = "right";

// 全局校验规则
rule.init(i18n);

document.title = i18n.t('lang.mainTitle')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
