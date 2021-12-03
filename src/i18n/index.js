import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueCookie from 'vue-cookie';
import enLangs from './en';
import zhLangs from './zh_cn';
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import enLocale from "element-ui/lib/locale/lang/en";
Vue.use(VueI18n);

const messages = {
  "en": {
    ...enLangs,
    ...enLocale
  },
  "zh": {
    ...zhLangs,
    ...zhLocale
  }
};

const i18n = new VueI18n({
  locale:VueCookie.get('language') || 'zh',
  fallbackLocale: 'zh',
  messages
})
export default i18n;
