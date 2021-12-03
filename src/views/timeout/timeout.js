// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Timeout from './Timeout.vue'
import i18n from "@/i18n";

document.title = i18n.t('lang.mainTitle');

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  i18n,
  template: '<Timeout/>',
  components: {
    Timeout
  }
});
