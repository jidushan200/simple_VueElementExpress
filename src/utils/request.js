"use strict";
import Vue from "vue";
import axios from "axios";
// import qs from "qs";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.baseURL = process.env.NODE_ENV === "development"?"/api":"/";
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 30 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const request = axios.create(config);

request.interceptors.request.use(
  function(config) {
    Vue.prototype.$Progress.start();
    // Do something before request is sent
    // config.data = qs.stringify(config.data);
    return config;
  },
  function(error) {
    // Do something with request error
    Vue.prototype.$Progress.fail();
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function(response) {
    // Do something with response data
    Vue.prototype.$Progress.finish();
    return response.data;
  },
  function(error) {
    // Do something with response error
    Vue.prototype.$Progress.fail();
    return Promise.reject(error);
  }
);

export function Plugin(Vue, options) {
  Vue.axios = request;
  window.axios = request;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return request;
      }
    },
    $axios: {
      get() {
        return request;
      }
    }
  });
}

export default request;
