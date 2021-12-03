<template>
  <el-container class="layout">
    <!-- 顶部导航栏 -->
    <el-header class="layout-header">
      <div class="layout-header-image" style="width:200px">
        <div class="layout-logo">
          <span>SOME LOGO</span>
        </div>
      </div>
      <div class="layout-header-menus">
        <navbar></navbar>
      </div>
    </el-header>
    <el-container class="layout-content">
      <!-- 左侧导航栏 -->
      <el-aside :width="sidebarWidth" class="layout-sidebar layout-transition" :class="{'layout-hide-text':isCollapse}">
        <sidebar :isCollapse="isCollapse" :iconSize="iconSize"></sidebar>
      </el-aside>
      <!-- 内容区 -->
      <el-main class="layout-content-main" :style="mainContentStyle" :class="{'layout-hide-text':isCollapse}">
        <div class="layout-content-header">
          <el-button type="text" size="large" :icon="breadcrumbIcon"
          style="font-size:20px; transition:all .4s ease-in-out" @click="toggleCollapse"></el-button>
          <div class="layout-content-breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(breadcrumb) in breadcrumbs"
                :key="breadcrumb.key" :to="{path:breadcrumb.path, query:{__:nowDate}}">
                {{$t(breadcrumb.name)}}
                </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="layout-content-workspace">
          <transition name="slide-fade" mode="out-in">
            <router-view :key="key"/>
          </transition>
        </div>
      </el-main>
    </el-container>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      key:'',
      isCollapse:false,
      breadcrumbIcon:"fa-dedent",
      iconSize:"icon-size-16",
      sidebarWidth:this.$cookie.get("language") === "en"?"220px":"200px",
      mainContentStyle:{
        left:this.$cookie.get("language") === "en"?"220px":"200px"
      },
      nowDate:Date.now(),
      breadcrumbs:[]
    };
  },
  watch: {
    // 切换页面
    '$route' (to, from) {
      this.key = this.$route.path;
      this.nowDate = Date.now();
      this.generateBreadCrumbs();
    }
  },
  mounted() {
    this.generateBreadCrumbs();
  },
  methods: {
    generateBreadCrumbs() {
      this.breadcrumbs = [];
      this.$route.matched.forEach((item, index) => {
        // 面包屑导航的路由传参
        let params = this.$route.params;
        let routePath = item.path;
        let paramKeys = Object.keys(params);
        if (paramKeys && paramKeys.length > 0) {
          for (let index = 0; index < paramKeys.length; index++) {
            let paramKey = paramKeys[index];
            routePath = routePath.replace(":" + paramKey, params[paramKey] || "");
          }
        } else {
          routePath = item.path;
        }
        this.breadcrumbs.push({
          path: routePath,
          key: item.meta.key,
          name: item.meta.title
        })
      });
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.iconSize = this.isCollapse?"icon-size-20":"icon-size-16";
      this.breadcrumbIcon = this.isCollapse?"fa-indent":"fa-dedent";
      if (this.isCollapse) {
        this.sidebarWidth = "";
        this.mainContentStyle = {};
      }
    }
  }
}
</script>

<style>
</style>
