const koarouter = require('koa-router');
const authRouter = require('./routers/authRouter');
const atmRouter = require('./routers/atmRouter');
const swaggerRouter = require('./routers/swaggerRouter');
const winston = require('winston');
module.exports = function(app) {
  try {
    let router = koarouter();

    app.use(router.routes());
    app.use(router.allowedMethods());

    authRouter(router);
    atmRouter(router);
    swaggerRouter(router);
  } catch (ex) {
    winston.error(ex);
  }
};
