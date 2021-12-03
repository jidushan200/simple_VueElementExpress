const Login = () => import(/* webpackChunkName: 'Login' */ '@/views/login/Login.vue');

const routes = [{
  path: '/login',
  name: 'login',
  component: Login,
  hidden: true,
  meta: {
    key: "login",
    title: "登录"
  }
}]

export default routes;
