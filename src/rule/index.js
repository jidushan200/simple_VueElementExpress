import rules from "./rules";
const Schema = require('async-validator');
export default {
  init(i18n) {
    rules.forEach((item, index) => {
      Schema.default.messages[item.type] = i18n.t(item.message);
      Schema.default.register(item.type, item.validator);
    });
  }
};
