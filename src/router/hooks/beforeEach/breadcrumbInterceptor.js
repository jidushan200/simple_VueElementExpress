// 面包屑动态标题
const breadcrumbInterceptor = (router) => (to, from, next) => {
  if (to.query.des) {
    to.matched.forEach((item, index) => {
      if (item.meta.breadNum) {
        item.meta.des = to.query.des;
      }
    });
  }
  next();
};

export default breadcrumbInterceptor;
