import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Index';
import { codemirror } from './codemirror';
import SearchForm from "./searchForm/SearchForm";
import DataTable from './table/DataTable';
import OperationPanel from './OperationPanel';

const iComponents = {
  Navbar: Navbar,
  Sidebar: Sidebar,
  codemirror,
  SearchForm,
  DataTable,
  OperationPanel
};

const install = function(Vue, opts = {}) {
  Object.keys(iComponents).forEach((key) => {
    Vue.component(key, iComponents[key]);
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Components = Object.assign(iComponents, { install });
export default Components;
