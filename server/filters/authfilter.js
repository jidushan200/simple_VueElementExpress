var _ = require('underscore');

function _testUrlList(urlList, url) {
  return (urlList || []).some(function (pattern) {
    if (!(pattern instanceof RegExp)) {
      return url === pattern;
    }

    var ret = false;
    ret = pattern.test(url);
    pattern.lastIndex = 0;

    return ret;
  });
}

exports.create = function (options) {
  options = _.extend({}, {
    allow: [],
    deny: [],
    check: null, // function (req, res[, callback])
    login: null // function (req, res)
  }, options);

  var filter = function (req, res, next) {
    var needTest = false;
    if (options.allow === true || !options.allow || options.allow.length === 0) {
      needTest = _testUrlList(options.deny, req.url);
    } else if (options.deny === true || !options.deny || options.deny.length === 0) {
      needTest = !_testUrlList(options.allow, req.url);
    } else {
      var allow = _testUrlList(options.deny, req.url);
      var deny = _testUrlList(options.allow, req.url);

      if (!allow && !deny) {
        throw new Error('URL not match');
      }

      needTest = allow || !deny;
    }

    if (!needTest) {
      next();
      return;
    }

    var onCheck = function (err, result) {
      if (err) {
        next(err);
        return;
      }

      if (result) {
        next();
      } else {
        options.login(req, res);
      }
    };

    if (options.check.length < 3) {
      onCheck(null, options.check(req, res));
    } else {
      options.check(req, res, onCheck);
    }
  };

  return filter;
};
