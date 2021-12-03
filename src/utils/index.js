import Vue from 'vue';
import { Plugin } from "./request";
import vueBackTop from "./vueBackTop";
import vueGlobal from "./vueGlobal";

const utils = {
  Plugin,
  vueBackTop,
  vueGlobal
};

Object.keys(utils).forEach((key, index) => {
  Vue.use(utils[key]);
});
