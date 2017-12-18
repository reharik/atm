const koarouter = require('koa-router');
const atmController = require('./../../controllers/atmController');

module.exports = function(appRouter) {
  const router = koarouter();
  /**
   * @swagger
   * /fetchaccount/{accountId}:
   *   get:
   *     x-name: fetchAccount
   *     description: fetch Account
   *     operationId: fetchAccount
   *     parameters:
   *       - name: accountId
   *         in: path
   *         required: true
   *         description: The account id
   *         type: string
   *     responses:
   *       201:
   *         description: Success
   *         schema:
   *           $ref: "#/definitions/account"
   *       422:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   *       500:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   */
  router.get('/fetchaccount/:accountId', atmController.fetchAccount);
  /**
   * @swagger
   * /makedeposit:
   *   post:
   *     x-name: makedDposit
   *     description: make Deposit
   *     operationId: makeDeposit
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           $ref: "#/definitions/transactionRequest"
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   *       500:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   */
  router.post('/makedeposit', atmController.makeDeposit);
  /**
   * @swagger
   * /makewithdrawal:
   *   post:
   *     x-name: makeWithdrawal
   *     description: make Withdrawal
   *     operationId: makeWithdrawal
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           $ref: "#/definitions/transactionRequest"
   *     responses:
   *       200:
   *         description: Success
   *       422:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   *       500:
   *         description: Failure
   *         schema:
   *             $ref: "#/definitions/standardFailureResponse"
   */
  router.post('/makewithdrawal', atmController.makeWithdrawal);

  appRouter.use(router.routes(), router.allowedMethods());
};
