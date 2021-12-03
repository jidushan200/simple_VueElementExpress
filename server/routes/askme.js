module.exports = function (options, context) {
  var express = require('express');
  var router = express.Router();

  /* GET index page */
  router.get('/', function(req, res, next) {
    let params = req.query;
    // let body = req.body;
    res.json({
      flag:true,
      data:params.msg
    })
  });

  return router;
}
