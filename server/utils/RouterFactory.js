var path = require('path');
var _ = require('underscore')._;
var logger = require('log4js').getLogger('RouterFactory');

exports.mount = function (configurations, parentRouter, context) {
  _.each(configurations, function (configuration) {
    var router;
    var name = configuration['name'] || configuration['class'] || configuration['mapping'] || '';
    var filePath = configuration['class'] ? '../' + path.join('routes', configuration['class']) : '../routes/default';

    try {
      router = require(filePath)(configuration, context);
    } catch (e) {
      logger.error('Fail to load router: ' + filePath, e);
    }
    logger.info('Initialized router: %s mapping: %s', name, (configuration['mapping'] || '/'));

    if (configuration['mapping']) {
      parentRouter.use(configuration['mapping'], router);
    } else {
      parentRouter.use(router);
    }
  });
};
