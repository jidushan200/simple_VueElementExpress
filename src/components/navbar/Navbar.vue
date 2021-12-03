<template>
  <el-menu :default-active="operationIndex"  class="el-menu--transparent skin" mode="horizontal"
    @select="onOperationSelect" menu-trigger="hover" active-text-color="#FFFFFF" background-color="#2d2e3b">
    <template v-for="menu in operationMenus">
      <el-submenu :index="menu.key" v-if="menu.flg&&menu.subMenus" :key="menu.key">
        <template slot="title">
          <i :class="[menu.iconType, iconSize]"></i>
          <span>{{menu.name}}</span>
        </template>
        <template v-for="subMenu in menu.subMenus">
          <el-menu-item :key="subMenu.key" :index="subMenu.key" v-if="subMenu.flg">
            <span v-if="subMenu.style" :class="[subMenu.style, subMenu.isActive ? 'active' : '']">
              <i v-if="subMenu.isActive" :class="{'fa-check':true, 'active': subMenu.isActive}"></i>
            </span>
            <span v-if="subMenu.name">{{subMenu.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item :index="menu.key" v-if="menu.flg&&!menu.subMenus" :key="menu.key">
          <i :class="[menu.iconType, iconSize]"></i>
          <span>{{menu.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
export default {
  name:"Navbar",
  data() {
    return {
      operationIndex: this.$cookie.get('language')||"zh",
      iconSize: "icon-size-14",
      operationMenus: [{
        flg: true,
        key: "zh",
        iconType: "",
        name: '中文'
      }, {
        flg: true,
        key: "en",
        iconType: "",
        name: 'En'
      }, {
        flg:true,
        key:'logout',
        iconType:'',
        name:'退出'
      }]
    }
  },
  methods: {
    onOperationSelect(index, indexPath, vm) {
      switch (index) {
        case 'zh':
        case 'en':
          this.$cookie.set('language', index);
          this.$i18n.locale = index;
          document.location.reload();
          break;
        case 'logout':
          this.$cookie.delete('role');
          this.$cookie.delete('token');
          document.location.reload();
          break;
      }
    }
  }
}
</script>
