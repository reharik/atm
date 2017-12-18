const koa = require('koa');
const config = require('config');
const koaConfig = require('./koaConfig');
const routes = require('./routes/routes');
const winston = require('winston');
const repository = require('./utilities/repository');
const ping = require('./utilities/buildDBSchema');
const seedDb = require('./utilities/seedDb');

module.exports = async function() {
  winston.level = 'silly';
  winston.info('approot ' + __dirname);
  winston.info('appTitle ' + config.app.title);

  let app = new koa();
  koaConfig(app);
  routes(app);

  app.listen(config.app.port);
  await ping();
  app.context.repository = repository;

  await seedDb();

  winston.info('Server started, listening on port: ' + config.app.port);
  winston.info('Environment: ' + config.app.env);
  return app;
};
