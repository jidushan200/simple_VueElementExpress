var fs = require('fs');
var logger = require('log4js').getLogger('Context');

var currentContext = {
  _resource: {},

  setResource: function (name, value) {
    currentContext._resource[name] = value;
  },

  getResource: function (name) {
    var context = currentContext;
    var content;
    if (context._resource[name]) {
      return context._resource[name];
    } else {
      try {
        var fileDefaultName = global.DIR_NAME + '/resources/' + name;
        var fileName = fs.existsSync(fileDefaultName) ? fileDefaultName : '';
        logger.info('Loading resource ' + fileName);

        if (fileName) {
          content = fs.readFileSync(fileName);

          if (/\.json/.test(name)) {
            content = JSON.parse(content);
          }

          context._resource[name] = content;
        } else {
          logger.error('No such resource: ' + name);
        }
      } catch (e) {
        logger.error('Error in loading resource: ' + name + ',' + e.message)
      }

      return content;
    }
  },

  clearResource: function (name) {
    if (name && currentContext._resource.name) {
      delete currentContext._resource.name;
    } else {
      currentContext._resource = {};
    }
  }
};

exports.getCurrentContext = function () {
  return currentContext;
};
