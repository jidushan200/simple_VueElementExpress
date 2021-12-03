module.exports = function() {
  // 登录拦截器
  // create an auth filter
  var filter = require('../filters/authfilter').create({
    // private zone, true for white list mode
    deny: [
      '/',
      '/index.html'
    ],
    // public zone
    allow: [ // 白名单
      '/error.html',
      /^\/static\/[a-z0-9_\-\/.%]+/i,
      /^\/api\/[a-z0-9_\-\/.%]+/i,
      /^\/node-api\/[a-z0-9_\-\/.%]+/i,
      /^.+\.js/g,
      /^.+\.css/g,
      /^.+\.jpg/g,
      /^.+\.jpeg/g,
      /^.+\.png/g,
      /^.+\.gif/g,
      /^.+\.ico/g,
      /^.+\.woff/g,
      /^.+\.woff2/g,
      /^.+\.ttf/g,
      /^.+\.do/g,
      /^.+\.mp3/g,
      /^.+\.map/g,
      /^.+\.html/g

    ],
    // check user login state
    check: function(req, res) {
      return Boolean(req.session.token);
    },
    // login method
    login: function(req, res) {
      let loginUrl = req.baseUrl ? (req.baseUrl + '/login.html') : '/login.html';
      res.redirect(loginUrl + "?__=" + new Date().getTime());
    }
  });

  return filter;
};
