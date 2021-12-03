<template>
  <el-menu
    :default-active="defaultActive"
    :unique-opened="true"
    :collapse="isCollapse"
    @open="handleMenuOpen"
    @select="handleSelectMenu">
    <sidebar-item v-for="menu in allMenus" :menu="menu" :key="menu.path" :base-path="menu.path"></sidebar-item>
  </el-menu>
</template>
<script>
import SidebarItem from './SidebarItem'
export default {
  name:"Index",
  components:{
    SidebarItem
  },
  props:{
    isCollapse:{
      type:Boolean,
      default:false
    },
    iconSize:{
      type:String,
      default:'icon-size-16'
    }
  },
  data() {
    return {
      defaultActive:"",
      nestMenus:{}
    }
  },
  watch: {
    // 切换页面
    '$route' (to, from) {
      this.defaultActive = this.$route.matched[0].path;
    }
  },
  mounted() {
  },
  computed: {
    'allMenus'() {
      let allRoutes = this.$store.getters.allRoutes.filter((menu) => {
        return !menu.hidden
      })
      return allRoutes;
    }
  },
  methods: {
    handleMenuOpen(index, indexPath) {
      // 展开菜单默认加载第一个子菜单
      this.$router.push({
        path: index,
        query: {
          __: +new Date()
        }
      });
    },
    handleSelectMenu(index, indexPath) {
      let path = index;
      this.$router.push({
        path: path,
        query: {
          __: +new Date()
        }
      });
    }
  }
}
</script>
