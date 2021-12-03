<template>
  <el-submenu :index="resolvePath(menu.path)" v-if="menu.children && (menu.children.length > 1 || (menu.children.length === 1 && menu.isNested))">
    <template slot="title">
      <i :class="[menu.meta.icon, iconSize]"></i>
      <span class="layout-text" :title="$t(menu.meta.title)">{{$t(menu.meta.title)}}</span>
    </template>
    <sidebar-item v-for="subMenu in menu.children" :menu="subMenu" :key="subMenu.path" :base-path="resolvePath(menu.path)"></sidebar-item>
  </el-submenu>
  <el-menu-item :index="resolvePath(menu.path)" v-else>
    <i :class="[menu.meta.icon, iconSize]"></i>
    <span slot="title" class="layout-text" :title="$t(menu.meta.title)">{{$t(menu.meta.title)}}</span>
  </el-menu-item>
</template>
<script>
import path from 'path'
export default {
  name:"SidebarItem",
  props:{
    menu:{
      type:Object,
      default:() => {
        return {};
      }
    },
    iconSize:{
      type:String,
      default:'icon-size-16'
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
