'use strict'
var path = require("path");
var DIR_NAME = __dirname;

module.exports = {
  SERVER_IP: "http://127.0.0.1:8080",
  DEV:path.join(DIR_NAME, "dev"),
  DIST:path.join(DIR_NAME, "dist"),
  SERVER_DIR:path.join(DIR_NAME, "server"),
  SERVER_VIEWS:path.join(DIR_NAME, "server/views"),
  ROOT_DIR:DIR_NAME,
  ROOT_URL:"/"
}
