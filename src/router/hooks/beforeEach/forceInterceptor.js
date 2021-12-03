// 强制刷新
const forceInterceptor = (router) => (to, from, next) => {
  if (to.meta.force) {
    // to.query.__ = +new Date();
  }
  next();
};

export default forceInterceptor;
