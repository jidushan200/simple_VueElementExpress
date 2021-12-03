let props = {
  id: {
    type: String,
    default: "id"
  },
  checkedBoxFlag: {
    type: Boolean,
    default: true
  },
  resData: String,
  columns: Array,
  columnsChecked: Array,
  operationMenus: {
    type: Array,
    default: function () {
      return []
    }
  },
  operationFlg: {
    type: String,
    default: ""
  },
  height: [String, Number],
  maxHeight: [String, Number],
  size: String,
  stripe: Boolean,
  border: Boolean,
  // componentTest: Object,
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  rowClassName: [String, Function],
  rowStyle: [String, Function],
  rowKey: [String, Function],
  emptyText: String,
  defaultExpandAll: Boolean,
  expandRowKeys: Array,
  defaultSort: Object,
  tooltipEffect: String,
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  tableStyle: {
    type: String,
    default: "width:100%;margin-top:20px;"
  },
  data: {
    type: Object,
    url: {
      type: String
    },
    method: {
      type: String,
      default: 'get',
      validator: value => { // 验证匹配
        const methodTypes = ['get', 'post', 'put', 'delete'];
        return methodTypes.indexOf(value.toLowerCase()) !== -1;
      }
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    keepSelection: { // 翻页是否保持选中
      type: Boolean,
      default: false
    },
    frontPaging: {
      type: Boolean,
      default: false
    }
  },
  autoReload: {
    type: Boolean,
    default: false
  },
  needReload: {
    type: Function,
    default: (row) => {
      return false;
    }
  },
  selectable: {
    type: Function,
    default: (row) => {
      return true;
    }
  },
  reloadTime: {
    type: Number,
    default: 5000
  },
  headers: {
    type: Object,
    default: () => {
      return {}
    }
  },
  autoLoad: {
    type: Boolean,
    default: true
  },
  dataHandler: {
    type: Function
  },
  showRefreshBtn: {
    type: Boolean,
    default: true
  },
  showSelectColumn: {
    type: Boolean,
    default: true
  },
  showSelectedCount: {
    type: Boolean,
    default: true
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [5, 10, 20, 50]
    }
  },
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  pageIndexKey: {
    type: String,
    default: 'pageIndex'
  },
  pageSizeKey: {
    type: String,
    default: 'pageSize'
  },
  dir: {
    type: String,
    default: 'ascending'
  },
  field: {
    type: String,
    default: ''
  },
  pageCount: {
    type: Number,
    default: 7
  }
}

export default props
