var createError = require('http-errors');
var httpProxy = require('http-proxy');
var express = require('express');
var history = require('connect-history-api-fallback');
var fs = require('fs')
var path = require('path');
// var ejs = require('ejs');
var nunjucks = require("nunjucks");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// session
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var favicon = require('serve-favicon');
var logger = require('log4js');

var helmet = require('helmet');
var tls = require('tls')
var compression = require('compression');

const context = require('./utils/Context').getCurrentContext();
var constants = require('../constants');

const server = function (serverApp) {
  logger.configure({
    replaceConsole: true,
    level: 'WARN',
    appenders: {
      console: {
        type: "console"
      }
    },
    categories: {
      default: {
        appenders: ["console"],
        level: 'WARN'
      }
    }
  });

  var app = express();
  const serverIP = context.getResource('serverIP') || constants.SERVER_IP;
  //  set server ip global
  context.setResource('serverIP', serverIP);
  serverApp.use(constants.ROOT_URL, app);
  // 重定向到根路由
  serverApp.use('/', function (req, res) {
    return res.redirect(constants.ROOT_URL);
  });
  serverApp.disable('x-powered-by');
  app.disable('x-powered-by');

  // 全局变量
  global.DIR_NAME = __dirname;
  global.context = context;

  // app.use(logger('dev'));
  let httpLogger = logger.connectLogger(logger.getLogger("http"), {
    level: 'auto',
    format: (req, res, format) => {
      return format(`:remote-addr - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"`);
    }
  });
  app.use(httpLogger);

  /** ************************安全相关START********************************* */
  // 禁用tls重协商
  tls.CLIENT_RENEG_LIMIT = 0;
  tls.CLIENT_RENEG_WINDOW = 0;
  app.use(helmet());
  app.use(helmet.referrerPolicy({
    policy: "same-origin"
  }));
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "http:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ['data:', "'self'"],
      connectSrc: ["'self'", 'wss://*:*', 'ws:', 'http:', 'https:'],
      fontSrc: ['data:', "'self'"],
      objectSrc: ["'self'"],
      frameSrc: ["'self'", 'http:', 'https:']
    }
  }));
  app.use(compression());
  app.disable('view cache');
  app.enable('trust proxy');
  app.set('trust proxy', 1); // trust first proxy

  // check http method
  app.use(function (req, res, next) {
    const disabledMethods = ['HEAD', 'OPTIONS'];
    if (disabledMethods.includes(req.method)) {
      res.status(403)
      res.end()
    } else {
      next()
    }
  })
  // csrf filter
  app.use('/', function (req, res, next) {
    const referer = req.headers.referer;
    if (typeof (referer) === "undefined") {
      if (req.method === 'GET') {
        next();
      } else {
        console.error(`referer is undefined, request method is ${req.method}`)
        res.status(406);
        res.end();
      }
    } else {
      if (referer !== null && referer !== "") {
        const protocol = req.protocol;
        const host = req.hostname;
        const originalUrl = protocol + "://" + host;
        const localUrl = protocol + "://localhost"; // 本地联调
        if (referer.indexOf(originalUrl) === 0 || referer.indexOf(localUrl) === 0) {
          next();
        } else {
          console.error(`referer is ${referer}, originalUrl is ${originalUrl}`)
          res.status(406);
          res.end();
        }
      } else {
        next();
      }
    }
  });
  /** ************************安全相关END********************************* */

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');
  // app.engine(".html", ejs.__express);
  // app.set('view engine', 'ejs');

  let _isDev = process.env.NODE_ENV === 'development';
  let staticPath = _isDev ? constants.DEV : constants.DIST;
  // usding nunjucks html template engine
  let nunjucksEnv = nunjucks.configure(staticPath, {
    autoescape: true,
    express: app,
    watch: _isDev,
    noCache: _isDev
  })
  nunjucksEnv.addFilter("safeJson", function (obj) {});
  // set favicon
  app.use(favicon(path.join(__dirname, '../static', 'favicon.png')))

  let sessionConf = {
    name: 'skey',
    secret: 'chyingp', // 用来对session id相关的cookie进行签名
    store: _isDev ? "" : new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: true, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    rolling: false,
    cookie: {
      secure: true
      // httpOnly: true,
      // domain: 'example.com',
      // path: 'foo/bar',
      // maxAge: 24 * 60 * 60 * 1000 // 有效期，单位是毫秒
    }
  };
  app.use(session(sessionConf));

  // 初始化http-proxy
  var proxyServer = httpProxy.createProxyServer({
    target: serverIP,
    changeOrigin: true
  });
  proxyServer.on("error", function (e) {
    logger.getLogger("proxy").error(e.message);
  });
  context.setResource('proxy', proxyServer);

  // 对应Vue-Router history 模式，不需要请注释掉此部分，同时修改src/router/index.js中的mode部分
  app.use(history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    rewrites: [{
      from: /^\/.*$/,
      to: function (context) {
        return "/";
      }
    }]
  }));
  // 使用axios+http-proxy，axios默认body为json格式，不需要parser
  app.use(/^(?!\/api)/, bodyParser.json());
  app.use(/^(?!\/api)/, bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, staticPath)));

  // 路由挂载
  var routerFactory = require('./utils/RouterFactory');
  routerFactory.mount(context.getResource('routes.json'), app, context);

  // 未匹配的路由重定向到首页
  // app.use('/', function (req, res) {
  //   let indexUrl = req.baseUrl ? (req.baseUrl + '/') : '/';
  //   res.redirect(indexUrl);
  //   return '';
  // });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  if (_isDev) {
    // 监视constants.js文件变化
    let reloadWait = false;
    fs.watch(path.join(__dirname, '../constants.js'), function (event, filename) {
      if (reloadWait) {
        return;
      }
      reloadWait = setTimeout(() => {
        reloadWait = false;
      }, 100);
      if (event === 'change') {
        delete require.cache[require.resolve('../constants.js')]
        var proxy = context.getResource('proxy');
        setTimeout(() => {
          constants = require('../constants.js');
          console.log(`${event} server ip to ${constants.SERVER_IP}`)
          context.setResource('serverIP', constants.SERVER_IP);
          proxy.options.target = constants.SERVER_IP
        })
      }
    })
  }
}

module.exports = server;
