const koarouter = require('koa-router');
const authController = require('./../../controllers/authController');

module.exports = function(appRouter) {
  const router = koarouter();
  /**
   * @swagger
   * /auth:
   *   post:
   *     x-name: auth
   *     description: validate auth
   *     operationId: auth
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           $ref: "#/definitions/signIn"
   *     responses:
   *       201:
   *         description: Success
   *         schema:
   *           $ref: "#/definitions/signInSuccess"
   *       401:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   *       500:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   */
  router.post('/auth', authController.auth);
  /**
   * @swagger
   * /checkauth:
   *   post:
   *     x-name: checkauth
   *     description: validate auth
   *     operationId: checkauth
   *     responses:
   *       200:
   *         description: Success
   *         schema:
   *             $ref: "#/definitions/standardSuccessResponse"
   *       422:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   *       500:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   */
  router.post('/checkauth', authController.checkAuth);

  appRouter.use(router.routes(), router.allowedMethods());
};
