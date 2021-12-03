// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "no-extra-semi": 2, // 不允许出现不必要的分号
    "semi": 0,  // 语句可以不需要分号结尾
    "quotes": [0, "single"], //引号类型 `` "" ''
    "key-spacing": 0,
    "space-infix-ops": 0,
    "space-before-function-paren": [0, "always"],
    // allow async-await
    'generator-star-spacing': 'off',
    'no-debugger': 2,
    'object-curly-spacing': 0,
    "no-extra-bind": 0
  }
}
