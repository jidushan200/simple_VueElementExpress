<template>
  <!-- eslint-disable -->
  <div>
    <div class="operation-panel margin-b5" v-if="operationMenus.length > 0&&menusFlg">
      <operation-panel :select-rows="multipleSelection" :operation-menus="operationMenus"></operation-panel>
    </div>
    <el-table
      v-loading.lock="loading"
      ref="table"
      :data="tblData"
      highlight-current-row
      stripe
      border
      style="width: 100%"
      :row-key="id"
      :expand-row-keys="expandRowKeys"
      :default-sort="{prop: prop, order: order}"
      @selection-change="private_selectionChange"
      @current-change="private_currentChange"
      @cell-click="cell => emitEventHandler('cell-click', cell)"
      @cell-dblclick="cell => emitEventHandler('cell-dblclick', cell)"
      @row-click="private_rowClick"
      @row-dblclick="row => emitEventHandler('row-dblclick', row)"
      @expand-change="current => emitEventHandler('expand-change', current)"
      @sort-change="private_sortChange"
    >
      <el-table-column
        reserve-selection
        type="selection"
        :selectable="selectable"
        width="41"
        v-if="checkedBoxFlag"
      ></el-table-column>
      <slot name="expandOperate"></slot>
      <el-table-column
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        :selectable="selectable"
        :column-key="column.columnKey"
        :prop="column.prop"
        :label="column.label"
        :align="column.align||'left'"
        :width="column.width"
        :sortable="column.sort"
        v-if="columnsCheckedT.indexOf(column.prop) >= 0"
        :minWidth="column.minWidth || column.width || 80"
        :render-header="column.renderHeader"
        :show-overflow-tooltip="column.isTooltip==undefined?true:false"
      >
        <template
          slot-scope="scope"
          :scope="newSlotScope ? 'scope' : false "
          v-if="!column.children"
        >
          <span v-if="column.slotName">
            <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
          </span>
          <span v-else-if="column.render">{{ column.render(scope.row) }}</span>
          <span v-else-if="column.statusTag">
            <status-tag :value="scope.row[column.prop]" :statusList="column.statusTag(scope.row)"></status-tag>
          </span>
          <span v-else-if="column.href">
            <href-slot :text="scope.row[column.prop]" @hrefFun="column.href(scope.row)"></href-slot>
          </span>
          <span
            v-else-if="column.formatter"
          >{{ column.formatter(scope.row, scope.column, scope.row[column.prop], scope.$index) }}</span>
          <span v-else>{{ scope.row[column.prop]==null?"-":scope.row[column.prop] }}</span>
        </template>
        <el-table-column
          v-for="(ecolumn, ecolumnIndex) in column.children"
          :key="ecolumnIndex"
          :prop="ecolumn.prop"
          :label="ecolumn.label"
          :align="ecolumn.align||'left'"
          :width="ecolumn.width"
          v-if="column.children.length>0"
          :minWidth="ecolumn.minWidth || ecolumn.width || 80"
          :render-header="ecolumn.renderHeader"
          :show-overflow-tooltip="ecolumn.isTooltip==undefined?true:false"
        >
          <template slot-scope="scope" :scope="newSlotScope ? 'scope' : false ">
            <span v-if="ecolumn.slotName">
              <slot :name="ecolumn.slotName" :row="scope.row" :$index="scope.$index" />
            </span>
            <span v-else-if="ecolumn.render">{{ ecolumn.render(scope.row) }}</span>
            <span
              v-else-if="column.formatter"
            >{{ ecolumn.formatter(scope.row, scope.column, scope.row[ecolumn.prop], scope.$index) }}</span>
            <span v-else-if="column.href">
              <href-slot :text="scope.row[column.prop]" @hrefFun="column.href(scope.row)"></href-slot>
            </span>
            <span v-else-if="column.statusTag">
              <status-tag :value="scope.row[column.prop]" :statusList="column.statusTag(scope.row)"></status-tag>
            </span>
            <span v-else>{{ scope.row[ecolumn.prop] }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <slot name="operate" />
    </el-table>
    <div style="margin: 10px 0; position: relative">
      <el-row>
        <el-col :span="5">
          <el-button v-if="showRefreshBtn" type="text" icon="fa-refresh" @click="private_refresh"></el-button>
          <span v-if="showSelectedCount">{{"当前选中 " + this.multipleSelection.length + " 条"}}</span>
          <el-popover placement="right" trigger="click" v-if="showSelectColumn">
            <el-checkbox-group class="vertical" v-model="columnsCheckedT" @change="checkboxChange">
              <el-checkbox
                class="item"
                v-for="(item) in columns"
                :label="item.prop"
                :key="item.prop"
                v-if="!item.disabled"
              >{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <!-- <div slot="reference" class="name-wrapper"> -->
            <el-tag slot="reference" class="name-wrapper">选择列</el-tag>
            <!-- </div> -->
          </el-popover>
        </el-col>
        <el-col :span="19">
          <el-pagination
            v-if="showPagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.pageIndex"
            :page-sizes="pageSizes"
            :page-size="pagination.pageSize"
            :layout="paginationLayout"
            :pager-count="pageCount"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import props from "./props";
import StatusTag from "./StatusTag.vue";
import HrefSlot from "./HrefSlot.vue";
export default {
  name: "DataTable",
  components: {
    StatusTag,
    HrefSlot
  },
  props,
  data() {
    const _this = this;
    return {
      tblData: [],
      totalData: [],
      multipleSelection: [],
      restUrl: this.data.url,
      method: this.data.method,
      params: this.data.params || {},
      datas: this.data.data || {},
      loading: false,
      reloadFlag: false,
      total: 0,
      allColumns: [],
      columnsCheckedT: [],
      pagination: {
        pageIndex: 1,
        pageSize: this.showPagination ? this.data.pageSize || 10 : 9999999
      },
      order: String(this.dir),
      prop: String(this.field),
      menusFlg: this.operationFlg ? Vue.AuthList[this.operationFlg] : true
    };
  },
  computed: {},
  mounted() {
    if (this.data.frontPaging) {
      if (this.autoLoad) {
        this.loadTblData();
      }
    } else {
      if (this.autoLoad && !this.field) {
        this.loadTblData();
      }
    }
    this.columnsCheckedT = this.getColumnsChecked();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  watch: {
    tblData: {
      immediate: false,
      handler: function(rows, oldVal) {
        var self = this;
        self.reloadFlag = false;
        if (rows != null) {
          for (let s = 0; s < rows.length; s++) {
            var entity = rows[s];
            var flag = self.needReload(entity);
            if (self.autoReload && flag) {
              self.reloadFlag = true;
              break;
            }
          }
        }
        if (this.interTblValid != null) {
          clearInterval(self.interTblValid);
        }
        if (self.reloadFlag) {
          self.interTblValid = setInterval(() => {
            self.loadTblData(false);
          }, self.reloadTime);
        }
      }
    },
    columns: {
      handler: function(rows, oldVal) {
        this.columnsCheckedT = this.getColumnsChecked();
      },
      deep: true
    },
    data: {
      immediate: false,
      handler: function(obj, oldVal) {
        this.restUrl = obj.url;
        this.method = obj.method;
      }
    }
  },
  beforeDestroy() {
    if (this.interTblValid != null) {
      clearInterval(this.interTblValid);
    }
  },
  methods: {
    async loadTblData(flg = true) {
      var self = this;
      var pageNumber = self.pagination.pageIndex;
      var pageSize = self.pagination.pageSize;
      if (this.data.frontPaging) {
        //前台分页
        pageSize = -1;
      }
      // var tableParams = "page=" + pageNumber + "&pageSize=" + pageSize;
      // if (this.prop) {
      //   this.order = this.order.replace("ending", "");
      //   tableParams += "&field=" + this.prop + "&dir=" + this.order;
      // }
      // var arr = Object.keys(self.params);
      // Object.keys(self.params).forEach((key) => {
      //   if (self.params[key] !== null) {
      //     if (key === "url") {
      //       self.data.url = self.params[key];
      //     } else {
      //       if (typeof self.params[key] === 'string') {
      //         self.params[key] = self.params[key].trim();
      //       }
      //       tableParams += "&" + key + "=" + encodeURIComponent(self.params[key]);
      //     }
      //   }
      // })
      let tableParams = {
        page: pageNumber,
        page_size: pageSize
      };
      if (this.prop) {
        this.order = this.order.replace("ending", "");
        tableParams.field = this.prop;
        tableParams.dir = this.order;
      }
      tableParams = Object.assign({}, tableParams, self.params);

      let reqData = {};
      reqData = Object.assign({}, reqData, self.datas);
      try {
        if (!self.autoReload) {
          self.loading = true;
        }
        let result = await self
          .$axios({
            method: self.data.method,
            params: tableParams,
            data: reqData,
            url: self.data.url
          })
          .then(function(res) {
            self.loading = false;
            let result = res;
            var flag = result["flag"];
            if (flag) {
              var redata = result["data"].list || result["data"] || [];
              if (self.data.frontPaging) {
                //前台分页
                self.totalData = redata;
                self.getFrontpagingData();
              } else {
                self.tblData = redata;
                self.total = result["data"].total;
              }
              if (self.data.length == 0 && self.pagination.pageIndex > 1) {
                self.pagination.pageIndex--;
                self.loadTblData();
              }
              if (flg) {
                self.checkedBoxFlag && self.$refs.table.clearSelection();
              }
            }
          })
          .catch(function(error) {
            self.loading = false;
          });
      } catch (res) {
        self.loading = false;
      }
    },
    checkboxChange() {
      localStorage.setItem(this.getColumnsCheckedKeys(), this.columnsCheckedT);
    },
    getColumnsCheckedKeys() {
      // 用路由原始路径(matched.path)+每列prop首字母拼起来作为key
      let matched = this.$route.matched;
      let pathKeys = matched[matched.length - 1].path;
      let colKeys = "";
      this.allColumns.forEach(element => {
        colKeys += element[0];
      });
      return pathKeys + colKeys;
    },
    reload() {
      let params, reset;
      if (arguments.length >= 2) {
        params = arguments[0];
        reset = arguments[1];
      } else if (arguments.length == 1) {
        if (typeof arguments[0] == "boolean") {
          params = {};
          reset = arguments[0];
        } else {
          params = arguments[0];
          reset = true;
        }
      } else {
        params = {};
        reset = true;
      }
      if (reset) {
        this.$refs.table.clearSort();
        this.pagination.pageIndex = 1;
        this.order = String(this.dir);
        this.prop = String(this.field);
      }
      // $.extend(this.params, params, true);
      this.params = Object.assign({}, this.params, params);
      this.loadTblData();
    },
    load() {
      this.params = this.data.params;
      this.loadTblData();
    },
    getSelectData() {
      return this.multipleSelection;
    },
    setSelectData(key, val) {
      this.multipleSelection.forEach((element, index) => {
        this.multipleSelection[index][key] = val;
      });
      this.$refs.table.clearSelection();
      return this.multipleSelection;
    },
    clear() {
      this.$refs.table.clearSelection();
    },
    empty() {
      this.tblData = [];
      this.total = 0;
    },
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).slice(1));
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      if (this.data.frontPaging) {
        //前台分页
        this.getFrontpagingData();
      } else {
        this.loadTblData();
      }
    },
    handleCurrentChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      if (this.data.frontPaging) {
        //前台分页
        this.getFrontpagingData();
      } else {
        this.loadTblData(!this.data.keepSelection);
      }
    },
    private_sortChange(obj) {
      if (!obj.prop) {
        return;
      }
      this.prop = obj.prop;
      if (this.data.frontPaging) {
        //前台分页
        this.order = obj.order;
        this.totalData.sort(this.$sortFormatter(this.prop, this.order));
        this.getFrontpagingData();
      } else {
        this.order = obj.order == "ascending" ? "asc" : "desc";
        this.loadTblData();
      }
      this.emitEventHandler("sort-change", arguments);
    },
    private_rowClick(row, e, column) {
      if (!(column.selectable != undefined && !column.selectable(row))) {
        this.$refs.table.toggleRowSelection(row);
      }
      this.emitEventHandler("row-click", arguments);
    },
    getColumnsChecked() {
      let r = [];
      this.allColumns = [];
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].disabled) {
          continue;
        }
        this.allColumns.push(this.columns[i].prop);
        if (this.columns[i].hide) {
          continue;
        }
        r.push(this.columns[i].prop);
      }
      let oldChecked = localStorage.getItem(this.getColumnsCheckedKeys());
      if (oldChecked) {
        return oldChecked.split(",");
      }
      return r;
    },
    resetColumns() {
      this.columnsCheckedT = this.getColumnsChecked();
    },
    private_selectionChange(rows) {
      if (this.checkedBoxFlag) {
        this.multipleSelection = rows;
        this.emitEventHandler("selection-change", rows);
      }
    },
    private_currentChange(row) {
      if (!this.checkedBoxFlag) {
        let arg = row ? [row] : [];
        this.multipleSelection = arg;
        this.emitEventHandler("selection-change", arg);
      }
    },
    private_refresh() {
      this.reload();
    },
    getFrontpagingData() {
      var self = this;
      let array = [];
      this.total = this.totalData.length;
      var pageNumber = self.pagination.pageIndex;
      var pageSize = self.pagination.pageSize;
      let startNum = 0;
      let endNum = 0;
      startNum = (pageNumber - 1) * pageSize;
      if (pageNumber * pageSize < this.total) {
        endNum = pageNumber * pageSize;
      } else {
        endNum = this.total;
      }
      this.tblData = this.totalData.slice(startNum, endNum);
    }
  }
};
</script>
<style scoped>
.item {
  display: block;
  padding: 0 0 5px 0;
}
.name-wrapper {
  display: inline-block;
}
.vertical .el-checkbox + .el-checkbox {
  margin-left: 0;
}
.el-pagination {
  float: right;
}
</style>
