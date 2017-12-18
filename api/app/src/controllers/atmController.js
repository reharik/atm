const winston = require('winston');
const moment = require('moment');
const uuid = require('uuid');

let fetchAccount = async function(ctx) {
  winston.debug('arrived at atm.fetchAccount');
  // get account
  let account = await ctx.repository.getById(ctx.params.accountId, 'account');
  if (!account) {
    ctx.status = 422;
    ctx.body = {error: `No Account with ${ctx.params.accountId} found`};
    return ctx;
  }

  // ideally all of the following logic would be in the domain object
  account.balance = account.transactions
    ? account.transactions.reduce((a, b) => a + b.amount, 0 )
    : 0;

  const dailyWithdrawal = account.transactions
    ? account.transactions
      .filter(x => x.type === 'withdrawal' && moment(x.date).isSame(moment(), 'day'))
      .reduce((a, b) => a + b.amount, 0)
    : 0;

  account.dailyWithdrawlLeft = account.dailyWithdrawalLimit + dailyWithdrawal < account.balance
    ? account.dailyWithdrawalLimit + dailyWithdrawal
    : account.balance;

  ctx.status = 201;
  ctx.body = { account };
  return ctx;
};

let makeWithdrawal = async ctx => {
  winston.debug('arrived at atm.makeWithdrawal');
  // get account
  let account = await ctx.repository.getById(ctx.request.body.accountId, 'account');
  if (!account) {
    ctx.status = 422;
    ctx.body = {error: `No Account with ${ctx.request.body.accountId} found`};
    return ctx;
  }

  // ideally all of the following logic would be in the domain object
  const balance = account.transactions.reduce((a, b) => a + b.amount, 0);
  let withdrawalAmount = ctx.request.body.amount;

  // in a real bank they would be happy for you to over draw so they could charge you tons of money
  // but for simplicity and humanity we will prevent that from happening
  if ((withdrawalAmount * -1) > balance) {
    ctx.status = 422;
    ctx.body = {error: `A withdrawal of $${withdrawalAmount} would result in an overdraft`};
    return ctx;
  }

  const dailyWithdrawal = account.transactions
    .filter(x => x.type === 'withdrawal' && moment(x.date).isSame(moment(), 'day'))
    .reduce((a, b) => a + b.amount, 0);
  const dailyWithdrawalLeft = account.dailyWithdrawalLimit - (dailyWithdrawal * -1);
  if ((withdrawalAmount * -1) > dailyWithdrawalLeft) {
    ctx.status = 422;
    ctx.body = {error: `You only have $${dailyWithdrawalLeft} available to withdraw at this time`};
    return ctx;
  }

  account.transactions.push({
    id: uuid.v4(),
    type: 'withdrawal',
    amount: withdrawalAmount,
    date: moment().toISOString()
  });
  // end of logic that should be in the domain
  await ctx.repository.save('account', account);

  ctx.status = 200;
  return ctx;
};

let makeDeposit = async ctx => {
  winston.debug('arrived at atm.makeDeposit');
  // get account
  let account = await ctx.repository.getById(ctx.request.body.accountId, 'account');
  if (!account) {
    ctx.status = 422;
    ctx.body = {error: `No Account with ${ctx.request.body.accountId} found`};
    return ctx;
  }
  // ideally this should be in the domain object
  if (!account.transactions) {
    account.transactions = [];
  }
  let amount = ctx.request.body.amount;
  account.transactions.push({
    id: uuid.v4(),
    type: 'deposit',
    amount,
    date: moment().toISOString()
  });

  await ctx.repository.save('account', account);

  ctx.status = 200;
  return ctx;
};

module.exports = {
  fetchAccount,
  makeDeposit,
  makeWithdrawal
};
