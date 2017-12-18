const koarouter = require('koa-router');
const swaggerController = require('./../../controllers/swaggerController');

module.exports = function(appRouter) {
  const router = koarouter();

  /**
   * @swagger
   * /swagger:
   *   get:
   *     x-name: swagger
   *     description: Returns swagger spec
   *     operationId: swagger
   *     responses:
   *       '200':
   *         description: Success
   *         schema:
   *           additionalProperties: {}
   */
  router.get('/swagger', swaggerController.swagger);

  appRouter.use(router.routes(), router.allowedMethods());
};
