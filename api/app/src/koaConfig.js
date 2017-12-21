const coViews = require('co-views');
const koaErrorHandler = require('./utilities/koaErrorHandler');
const koaBodyparser = require('koa-bodyparser');
const config = require('config');
const koa2cors = require('koa2-cors');
const swaggerSpec = require('./utilities/swaggerSpec');
const swaggerValidationMiddleware = require('./utilities/swaggerMiddleware/swaggerValidationMiddleware');
const koalogger = require('koa-logger');
const koagenericsession = require('koa-generic-session');
const papersConfig = require('./papersConfig');
const koaconvert = require('koa-convert');

module.exports = function(app) {
  if (!config.app.keys) {
    throw new Error('Please add session secret key in the config file!');
  }

  app.keys = config.app.keys;
  app.use(koalogger());
  app.use(koaErrorHandler());
  app.use(koa2cors({
    origin: ctx => {
      const origin = `http://localhost:8888`;
      const origin2 = `${config.app.swagger_ui_url}`;
      if (ctx.header.origin === origin || ctx.header.origin === origin2) {
        return ctx.header.origin;
      }
      return false;
    },
    credentials: true }));

  app.use(koaBodyparser());
  app.use(koagenericsession());

  app.use(async function(ctx, next) {
    await next();
  });

  app.use(koaconvert(papersConfig()));


  let JSONSwaggerDoc = JSON.parse(swaggerSpec());
  app.use(swaggerValidationMiddleware(JSONSwaggerDoc));

  app.use(async function(ctx, next) {
    ctx.render = coViews(config.app.root + '/app/src/views', {
      map: {html: 'swig'}
    });
    await next();
  });
};
