module.exports = function (options, context) {
  var express = require('express');
  var router = express.Router();

  /* GET index page */
  router.get('/:username', function (req, res, next) {
    let username = req.params.username;
    let resData = {};

    if (!username) {
      resData = {
        flag: false,
        data: '找不到用户'
      }
    }
    if (username === 'admin') { // 管理员登录
      resData = {
        flag: true,
        data: {
          role: '0',
          account: username,
          userName: username
        }
      }
    } else if (username === 'user') { // 用户登录
      resData = {
        flag: true,
        data: {
          role: '1',
          account: username,
          userName: username
        }
      }
    } else {
      resData = {
        flag: false,
        data: '找不到用户'
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

      res.json(resData)
    })
  });
  return router;
}
