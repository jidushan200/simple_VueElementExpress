// 路由权限校验
import {getToken, removeToken} from '@/utils/token'
import {getRole} from '@/utils/roles'
import {getAccount} from '@/utils/account'
import store from '@/store'
import { resetRouter } from '@/router'
// import router from '../../index'
const whiteList = ['/login', '/timeout'] // no redirect whitelist
const authCheck = (router) => async(to, from, next) => {
// router.beforeEach(async(to, from, next) => {
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // next('/')
      next({ path: '/' });
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      let role = getRole()
      const account = getAccount();
      if (role && store.getters.asyncRouters.length > 0) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { role } = await store.dispatch('user/getInfo', store.getters.account || account)
          // generate accessible routes map based on roles
          store.dispatch('permission/generateRoutes', [role]).then(() => {
            console.log('accessRoutes====', store.getters.asyncRouters)
            // dynamically add accessible routes
            resetRouter();
            router.addRoutes(store.getters.asyncRouters)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
        } catch (error) {
          // remove token and go to login page to re-login
          removeToken()
          console.error(error || 'Has Error')
          next('/')
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.includes(to.path)) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
// });
};

/* function filterRouteAccess(routeList, role = "") {
  for (let index = routeList.length - 1; index >= 0; index--) {
    const route = routeList[index];
    if (route.meta && route.meta.accessFlag) {
      if (route.meta.accessFlag.includes(role)) {
        if (route.children && route.children.length > 0) {
          filterRouteAccess(route.children, role);
        }
      } else {
        routeList.splice(index, 1);
      }
    } else {
      if (route.children && route.children.length > 0) {
        filterRouteAccess(route.children, role);
      }
    }
  }
} */

export default authCheck;
