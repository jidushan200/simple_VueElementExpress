const Timeout = () => import(/* webpackChunkName: 'Timeout' */ '@/views/timeout/Timeout.vue');

const routes = [{
  path: '/timeout',
  name: 'timeout',
  component: Timeout,
  hidden: true,
  meta: {
    key: "timeout",
    title: "错误"
  }
}]

export default routes;
