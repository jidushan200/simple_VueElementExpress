import i18n from "@/i18n";

// 权限拦截
const titleInterceptor = (router) => (to, from, next) => {
  document.title = i18n.t(to.meta.title) || i18n.t('lang.mainTitle');
  next();
};

export default titleInterceptor;
