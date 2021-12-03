<template>
  <!-- eslint-disable -->
  <div class="operation-panel" v-if="menusFlg">
    <template v-for="(menu, index) in menus">
      <el-button
        type="primary"
        size="small"
        :icon="iconTran(menu.icon)"
        :disabled="!!!menu.enableFlg"
        @click="menu.handler(selectRows, $event)"
        :key="index"
        v-if="menu.showflg"
      >{{menu.name}}</el-button>
    </template>
    <el-dropdown trigger="click" v-if="operateMore" @command="menusMoreHandler">
      <el-button type="primary" size="small">
        {{$t('calcStorLang.instMoreOperate')}}
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <template v-for="(menu, index) in menusMore">
          <el-dropdown-item
            class="clearfix"
            :key="index"
            :disabled="!!!menu.enableFlg"
            :command="index"
            v-if="menu.showflg"
          >{{menu.name}}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "OperationPanel",
  props: {
    selectRows: {
      type: Array,
      default: () => {
        return [];
      }
    },
    operationMenus: {
      type: Array,
      default: () => {
        return [];
      }
    },
    flg: {
      type: String,
      default: () => {
        return "";
      }
    },
    operateMore: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      menus: this.initMenus(),
      menusMore: this.initMoreMenus(),
      menusFlg: this.flg ? Vue.AuthList[this.flg] : true
    };
  },
  computed: {},
  watch: {
    selectRows: {
      handler: function(rows, oldVal) {
        this.reset(rows);
      },
      deep: true
    },
    operationMenus: {
      handler: function(rows, oldVal) {
        this.menus = this.initMenus();
        this.menusMore = this.initMoreMenus();
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    iconTran(value) {
      return value;
    },
    initMenus() {
      let menus = [];
      this.operationMenus.forEach((item, index) => {
        let menu = item;
        menu.enableFlg = false;
        if (menu.readOnly) {
          menu.enableFlg = true;
        }
        if (!menu.operateMore) {
          menus.push(menu);
        }
      });
      return menus;
    },
    initMoreMenus() {
      let menus = [];
      this.operationMenus.forEach((item, index) => {
        let menu = item;
        menu.enableFlg = false;
        if (menu.readOnly) {
          menu.enableFlg = true;
        }
        if (menu.operateMore) {
          menus.push(menu);
        }
      });
      return menus;
    },
    menusMoreHandler(index, row) {
      this.menusMore[index].handler(this.selectRows);
    },
    reset(rows) {
      this.menus.forEach((item, index) => {
        let menu = item;
        if (menu.readOnly) {
          menu.enableFlg = true;
        } else if (rows.length <= 0) {
          menu.enableFlg = false;
        } else if (!menu.multi && rows.length > 1) {
          menu.enableFlg = false;
        } else {
          let flg = true;
          rows.forEach((row, index) => {
            if (!menu.enable(row)) {
              flg = false;
            }
          });
          menu.enableFlg = flg;
        }
        this.menus.splice(index, 1, menu);
      });
      // 更多菜单
      this.menusMore.forEach((item, index) => {
        let menu = item;
        if (menu.readOnly) {
          menu.enableFlg = true;
        } else if (rows.length <= 0) {
          menu.enableFlg = false;
        } else if (!menu.multi && rows.length > 1) {
          menu.enableFlg = false;
        } else {
          let flg = true;
          rows.forEach((row, index) => {
            if (!menu.enable(row)) {
              flg = false;
            }
          });
          menu.enableFlg = flg;
        }
        this.menusMore.splice(index, 1, menu);
      });
    }
  }
};
</script>
<style scoped>
</style>
