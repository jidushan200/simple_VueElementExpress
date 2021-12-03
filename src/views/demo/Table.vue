<template>
  <div>
    <data-table
      ref="deTable"
      id="m_id"
      :checkedBoxFlag="false"
      :data="options"
      :columns="columns"
      :operation-menus="operationMenus">
    </data-table>
  </div>
</template>

<script>
export default {
  name:"ModelList",
  data() {
    return {
      options: {
        url: "",
        method: "get"
      },
      columns: [{
        prop: "m_name",
        label: "名称"
      }, {
        prop: "f_feature_name",
        label: "功能",
        render: function(row) {
          return this.$t('lang.' + row.f_feature_name)
        }.bind(this)
      }, {
        prop: "uc_class",
        label: "类型"
      }, {
        prop: "uc_use",
        label: "用途",
        render: function(row) {
          return this.$t('lang.' + row.uc_use)
        }.bind(this)
      }, {
        prop: "m_type",
        label: "网络"
      }, {
        prop: "m_size",
        label: "大小"
      }, {
        prop: "m_create_time",
        label: "创建时间",
        sort:"custom",
        render:function(row) {
          return this.$datewithTzeroFormatter(row.m_create_time);
        }.bind(this)
      }, {
        prop: "m_path",
        label: "模型路径"
      }, {
        prop: "proportion",
        label: "重训比例",
        render:function(row) {
          return row.proportion * 100 + "%";
        }.bind(this)
      }, {
        prop: "m_status",
        label: "状态"
      }, {
        prop: "m_description",
        label: "描述"
      }],
      operationMenus:[{
        icon: "fa-edit",
        name: "编辑",
        showflg: true,
        multi: false,
        enable:function (obj) {
          return true;
        }.bind(this),
        handler: function(rows) {
          console.log(rows)
        }.bind(this)
      }]
    }
  },
  mounted() {
  }
}
</script>
