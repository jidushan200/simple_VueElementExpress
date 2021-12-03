module.exports = function (options, context) {
  var express = require('express');
  var router = express.Router();
  const {
    v4: uuid
  } = require('uuid');
  const sessionHelper = require('../utils/SessionHelper')

  /* GET index page */
  router.post('/', function (req, res, next) {
    let body = req.body;
    let {
      account,
      password
    } = body;
    let resData = {};

    if (!account || !password) {
      resData = {
        flag: false,
        data: '用户名或密码错误'
      }
    }
    if (account === 'admin' && password === '111111') { // 管理员登录
      resData = {
        flag: true,
        data: {
          token: uuid(), // 为演示方便，使用uuid作为token
          role: '0',
          account: account,
          userName: account
        }
      }
    } else if (account === 'user' && password === '111111') { // 用户登录
      resData = {
        flag: true,
        data: {
          token: uuid(), // 为演示方便，使用uuid作为token
          role: '1',
          account: account,
          userName: account
        }
      }
    }
    req.session.regenerate(function (err) {
      if (err) {
        res.json({
          flag: false,
          data: 'session regenerate failed'
        });
        return;
      }

      sessionHelper.setSession(req, res, resData)
      res.json(resData)
    })
  });
  return router;
}
