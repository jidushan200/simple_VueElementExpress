import * as util from "./util";
/* eslint-disable */
export default [{
  type: 'required',
  message: 'validation.required',
  validator: function (rule, value, cb, source, options) {
    if ((value + "").replace(/^\s+/, "").replace(/\s+$/, "") || value.length != 0) {
      return cb();
    }
    cb(new Error(options.messages[rule.type]));
  }
}, {
  type: 'integer',
  message: 'validation.integer',
  validator: function (rule, value, cb, source, options) {
    if (value === "") {
      return cb();
    }
    if (/^[-+]?\d+$/.test(value)) {
      return cb();
    }
    cb(new Error(options.messages[rule.type]));
  }
}, {
  type: 'min',
  message: 'validation.min',
  validator: function (rule, value, cb, source, options) {
    if (value === "") {
      return cb();
    }
    if (value * 1 >= rule.value * 1) {
      return cb();
    }
    let err = util.format(options.messages[rule.type], rule.value)
    cb(new Error(err));
  }
}, {
  type: 'max',
  message: 'validation.max',
  validator: function (rule, value, cb, source, options) {
    if (value === "") {
      return cb();
    }
    if (value * 1 <= rule.value * 1) {
      return cb();
    }
    let err = util.format(options.messages[rule.type], rule.value)
    cb(new Error(err));
  }
}, {
  type: 'minSize',
  message: 'validation.minSize',
  validator: function (rule, value, cb, source, options) {
    if (value.length >= rule.value) {
      return cb();
    }
    let err = util.format(options.messages[rule.type], rule.value)
    cb(new Error(err));
  }
}, {
  type: 'maxSize',
  message: 'validation.maxSize',
  validator: function (rule, value, cb, source, options) {
    if (value.length <= rule.value) {
      return cb();
    }
    let err = util.format(options.messages[rule.type], rule.value)
    cb(new Error(err));
  }
}, {
  type: 'onlyLetterNumber',
  message: 'validation.onlyLetterNumber',
  validator: function (rule, value, cb, source, options) {
    if (value === "") {
      return cb();
    }
    if (/^[0-9a-zA-Z]+$/.test(value)) {
      return cb();
    }
    cb(new Error(options.messages[rule.type]));
  }
}, {
  type: 'email',
  message: 'validation.email',
  validator: function (rule, value, cb, source, options) {
    let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(value)) {
      return cb();
    }
    cb(new Error(options.messages[rule.type]));
  }
}, {
  type: 'phone',
  message: 'validation.phone',
  validator: function (rule, value, cb, source, options) {
    let reg = /(^\d{10,11}$)|(^\d{7,8}$)|(^(\d{3,4})\-(\d{7,8})$)|(^(\d{3,4})\-(\d{7,8})\-(\d{1,4})$)|(^(\d{7,8})\-(\d{1,4})$)/;
    if (reg.test(value)) {
      return cb();
    }
    cb(new Error(options.messages[rule.type]));
  }
}, {
  type: 'ipv4',
  message: 'validation.ip',
  validator: function (rule, value, cb, source, options) {
    if (value === "") {
      return cb();
    }
    let reg = /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/;
    if (reg.test(value)) {
      return cb();
    }
    cb(new Error(options.messages[rule.type]));
  }
}
];
