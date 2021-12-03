var vueGlobal = {};
vueGlobal.install = function (Vue) {
  if (vueGlobal.installed) {
    return;
  }
  vueGlobal.installed = true;
  Vue.menuCodeList = window.menuCodeList;
}
module.exports = vueGlobal;
