import Layout from '@/components/layout/Index.vue';
const HelloWorld = () => import(/* webpackChunkName: 'HelloWorld' */ '@/views/demo/HelloWorld.vue');
const NestedRoutes = () => import(/* webpackChunkName: 'NestedRoutes' */ '@/views/demo/NestedRoutes.vue');
const Codemirror = () => import(/* webpackChunkName: 'Codemirror' */ '@/views/demo/Codemirror.vue');
const Table = () => import(/* webpackChunkName: 'Table' */ '@/views/demo/Table.vue');

const routes = [{
  path: '/helloWorld',
  component: Layout,
  alias:'/',
  redirect: '/helloWorld/index',
  meta:{
    key:"helloWorld",
    accessFlag:['0'],
    title:"route.apiTest",
    icon:"fa-paper-plane"
  },
  children:[{
    path: 'index',
    name: 'helloWorld',
    component: HelloWorld
  }]
}, {
  path: '/nestedRoutes',
  name: 'nestedRoutes',
  component: Layout,
  alias:'/',
  redirect:'/nestedRoutes/nestedRoutes-1',
  isNested:true, // 是否嵌套路由，true：子路由转换为子菜单(src\components\sidebar\SidebarItem.vue)
  meta:{
    key:"nestedRoutes",
    accessFlag:['0', '1'],
    title:"route.nestedRoute",
    icon:"fa-road"
  },
  children:[{
    path: 'nestedRoutes-1',
    name: 'nestedRoutes-1',
    component: NestedRoutes,
    alias:'/',
    redirect:'/nestedRoutes/nestedRoutes-1/nestedRoutes-1-1',
    isNested:true, // 是否嵌套路由，true：子路由转换为子菜单(src\components\sidebar\SidebarItem.vue)
    meta:{
      key:"nestedRoutes-1",
      accessFlag:['0'],
      title:"route.nestedRoute_1",
      icon:"fa-road"
    },
    children:[{
      path: 'nestedRoutes-1-1',
      name: 'nestedRoutes-1-1',
      component: NestedRoutes,
      meta:{
        key:"nestedRoutes-1-1",
        accessFlag:['0'],
        title:"route.nestedRoute_1_1",
        icon:"fa-road"
      }
    }]
  }, {
    path: 'nestedRoutes-2',
    name: 'nestedRoutes-2',
    component: NestedRoutes,
    alias:'/',
    redirect:'/nestedRoutes/nestedRoutes-2/nestedRoutes-2-1',
    isNested:true, // 是否嵌套路由，true：子路由转换为子菜单(src\components\sidebar\SidebarItem.vue)
    meta:{
      key:"nestedRoutes-2",
      accessFlag:['1'],
      title:"route.nestedRoute_2",
      icon:"fa-road"
    },
    children:[{
      path: 'nestedRoutes-2-1',
      name: 'nestedRoutes-2-1',
      component: NestedRoutes,
      meta:{
        key:"nestedRoutes-2-1",
        accessFlag:['1'],
        title:"route.nestedRoute_2_1",
        icon:"fa-road"
      }
    }]
  }]
}, {
  path:'/codemirror',
  component: Layout,
  alias:'/',
  redirect: '/codemirror/index',
  meta:{
    key:"codemirror",
    accessFlag:['0', '1'],
    title:"route.codemirror",
    icon:"fa-code"
  },
  children:[{
    path: 'index',
    name: 'codemirror',
    component: Codemirror
  }]
}, {
  path:'/table',
  component: Layout,
  alias:'/',
  redirect: '/table/index',
  meta:{
    key:"table",
    accessFlag:['0', '1'],
    title:"route.table",
    icon:"fa-table"
  },
  children:[{
    path: 'index',
    name: 'table',
    component: Table
  }]
}]

export default routes;
