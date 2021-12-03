module.exports = function (options, context) {
  var express = require('express');
  var router = express.Router();
  const sessionHelper = require('../utils/SessionHelper')

  /* GET index page */
  router.get('/', function(req, res, next) {
    res.header("Cache-Control", "no-cache");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.render('index', Object.assign({}, sessionHelper.getSession(req, res, next)));
  });

  return router;
}
