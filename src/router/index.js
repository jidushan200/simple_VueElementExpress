import Vue from 'vue'
import Router from 'vue-router'
import demos from './map/demo';
import login from './map/login';
import timeout from './map/timeout';
import hooks from './hooks/' // 路由钩子

Vue.use(Router)

const constantsRoutes = [
  ...login,
  ...timeout
]
const asyncRoutes = [
  ...demos,
  {
    path: '*',
    hidden: true,
    redirect: function () {
      Vue.prototype.$message.error("没有权限或者访问的页面不存在")
      return "/";
    }
  }
]

/**
 * 根据路由定义生成菜单数据
 */
let generateMenuFromRoutes = function (routes = []) {
  let menus = [];
  routes.some(route => {
    // 过滤隐藏、没有权限访问的菜单
    if (!route.hidden) {
      let m = {
        name: route.name,
        path: route.path,
        meta: route.meta
      };
      if (route.children) {
        m.subMenus = generateMenuFromRoutes(route.children)
      }
      menus.push(m)
    }
  })
  return menus;
}

export {
  constantsRoutes,
  asyncRoutes,
  generateMenuFromRoutes
};

const createRouter = () => new Router({
  mode:"history", // Vue-Router history 模式，不需要请注释掉此部分，同时修改server/app.js中的history()部分
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantsRoutes
})

const router = createRouter();
hooks(router);

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;
