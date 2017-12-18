const atmController = require('./../../src/controllers/atmController');
const repository = require('./../../src/utilities/repository');
const moment = require('moment');
const uuid = require('uuid');

const td = require('testdouble');
const chai = require('chai');
chai.should();

describe('ATM_CONTROLLER', function() {

  before(function() {
  });

  beforeEach(function() {
  });

  context('when calling fetchAccount on controller', () => {
    context('with a good id', () => {
      it('should return a body', async function() {
        let repo = td.object(repository);
        let account1 = {
          id: uuid.v4(),
          displayName: 'checking',
          type: 'checking',
          dailyWithdrawalLimit: 300
        };
        td.when(repo.getById(account1.id, 'account')).thenReturn(account1);
        let result = await atmController.fetchAccount({repository: repo, params: {accountId: account1.id}});
        result.body.should.be.a('object');
        result.body.account.id.should.equal(account1.id);
      })
    });
    it('should return a proper balance', async function() {
      let repo = td.object(repository);
      let tran1 = {
        id: uuid.v4(),
        type: 'deposit',
        amount: 200,
        date: moment().toISOString()
      };
      let tran2 = {
        id: uuid.v4(),
        type: 'withdrawal',
        amount: -100,
        date: moment().toISOString()
      };

      let account1 = {
        id: uuid.v4(),
        displayName: 'checking',
        type: 'checking',
        dailyWithdrawalLimit: 300,
        transactions: [tran1, tran2]
      };
      td.when(repo.getById(account1.id, 'account')).thenReturn(account1);
      let result = await atmController.fetchAccount({repository: repo, params: {accountId: account1.id}});
      result.body.should.be.a('object');
      result.body.account.balance.should.equal(100);
    });
    it('should return a proper dailyWithdrawlLeft', async function() {
      let repo = td.object(repository);
      let tran1 = {
        id: uuid.v4(),
        type: 'deposit',
        amount: 300,
        date: moment().toISOString()
      };
      let tran2 = {
        id: uuid.v4(),
        type: 'withdrawal',
        amount: -100,
        date: moment().toISOString()
      };

      let account1 = {
        id: uuid.v4(),
        displayName: 'checking',
        type: 'checking',
        dailyWithdrawalLimit: 300,
        transactions: [tran1, tran2]
      };
      td.when(repo.getById(account1.id, 'account')).thenReturn(account1);
      let result = await atmController.fetchAccount({repository: repo, params: {accountId: account1.id}});
      result.body.should.be.a('object');
      result.body.account.dailyWithdrawlLeft.should.equal(200);
    });
    it('should return a proper dailyWithdrawlLeft when previous day withdrawals', async function() {
      let repo = td.object(repository);
      let tran1 = {
        id: uuid.v4(),
        type: 'deposit',
        amount: 500,
        date: moment().subtract(2, 'day').toISOString()
      };
      let tran2 = {
        id: uuid.v4(),
        type: 'withdrawal',
        amount: -100,
        date: moment().subtract(1, 'day').toISOString()
      };
      let tran3 = {
        id: uuid.v4(),
        type: 'withdrawal',
        amount: -100,
        date: moment().toISOString()
      };

      let account1 = {
        id: uuid.v4(),
        displayName: 'checking',
        type: 'checking',
        dailyWithdrawalLimit: 300,
        transactions: [tran1, tran2, tran3]
      };
      td.when(repo.getById(account1.id, 'account')).thenReturn(account1);
      let result = await atmController.fetchAccount({repository: repo, params: {accountId: account1.id}});
      result.body.should.be.a('object');
      result.body.account.dailyWithdrawlLeft.should.equal(200);
    });

    it('should return a proper dailyWithdrawlLeft when balance low', async function() {
      let repo = td.object(repository);
      let tran1 = {
        id: uuid.v4(),
        type: 'deposit',
        amount: 300,
        date: moment().subtract(2, 'day').toISOString()
      };
      let tran2 = {
        id: uuid.v4(),
        type: 'withdrawal',
        amount: -100,
        date: moment().subtract(1, 'day').toISOString()
      };
      let tran3 = {
        id: uuid.v4(),
        type: 'withdrawal',
        amount: -100,
        date: moment().toISOString()
      };

      let account1 = {
        id: uuid.v4(),
        displayName: 'checking',
        type: 'checking',
        dailyWithdrawalLimit: 300,
        transactions: [tran1, tran2, tran3]
      };
      td.when(repo.getById(account1.id, 'account')).thenReturn(account1);
      let result = await atmController.fetchAccount({repository: repo, params: {accountId: account1.id}});
      result.body.should.be.a('object');
      result.body.account.dailyWithdrawlLeft.should.equal(100);
    });
  });

  context('when calling fetchAccount on controller', () => {
    context('with a bad id', () => {
      it('should return a proper status', async function() {
        let repo = td.object(repository);
        let badId = uuid.v4();
        td.when(repo.getById(badId, 'account')).thenReturn(undefined);
        let result = await atmController.fetchAccount({repository: repo, params: {accountId: badId}});
        result.body.should.be.a('object');
        result.status.should.equal(422);
        result.body.error.should.equal(`No Account with ${badId} found`)
      })
    });
  });

  context('when calling makeDeposit on controller', () => {
    context('with a good payload, account has no transaction', () => {
      it('should persist new transaction', async function() {
        let repo = td.object(repository);
        let captor = td.matchers.captor();

        let account1 = {
          id: uuid.v4(),
          displayName: 'checking',
          type: 'checking',
          dailyWithdrawalLimit: 300
        };
        const amount = 200;
        const body = {
          accountId: account1.id,
          amount
        };

        td.when(repo.getById(account1.id, 'account')).thenReturn(account1);
        let result = await atmController.makeDeposit({repository: repo, request: {body}});
        result.status.should.equal(200);

        td.verify(repo.save('account', captor.capture()));
        captor.value.transactions.length.should.equal(1);
        captor.value.transactions[0].amount.should.equal(amount);
        captor.value.transactions[0].type.should.equal('deposit');
      })
    });
  });

  context('when calling makeDeposit on controller', () => {
    context('with a bad id', () => {
      it('should return a proper status', async function() {
        let repo = td.object(repository);
        let badId = uuid.v4();
        const body = {
          accountId: badId,
          amount: 200
        };

        td.when(repo.getById(badId, 'account')).thenReturn(undefined);
        let result = await atmController.makeDeposit({repository: repo, request: {body}});
        result.status.should.equal(422);
        result.body.error.should.equal(`No Account with ${badId} found`)
      })
    });
  });

  context('when calling makeWithdrawal on controller', () => {
    context('with a good payload, good balance, good limit', () => {
      it('should persist new transaction', async function() {
        let repo = td.object(repository);
        let captor = td.matchers.captor();

        let tran1 = {
          id: uuid.v4(),
          type: 'deposit',
          amount: 300,
          date: moment().subtract(2, 'day').toISOString()
        };

      let account1 = {
        id: uuid.v4(),
        displayName: 'checking',
        type: 'checking',
        dailyWithdrawalLimit: 300,
        transactions: [tran1]
      };

        const amount = 200;
        const body = {
          accountId: account1.id,
          amount
        };

        td.when(repo.getById(account1.id, 'account')).thenReturn(account1);
        let result = await atmController.makeWithdrawal({repository: repo, request: {body}});
        result.status.should.equal(200);

        td.verify(repo.save('account', captor.capture()));
        captor.value.transactions.length.should.equal(2);
        captor.value.transactions[1].amount.should.equal(amount);
        captor.value.transactions[1].type.should.equal('withdrawal');
      })
    });

    context('with a good payload, bad balance', () => {
      it('should persist new transaction', async function() {
        let repo = td.object(repository);
        let captor = td.matchers.captor();

        let tran1 = {
          id: uuid.v4(),
          type: 'deposit',
          amount: 300,
          date: moment().subtract(2, 'day').toISOString()
        };

        let tran2 = {
          id: uuid.v4(),
          type: 'withdrawal',
          amount: -200,
          date: moment().toISOString()
        };

        let account1 = {
          id: uuid.v4(),
          displayName: 'checking',
          type: 'checking',
          dailyWithdrawalLimit: 300,
          transactions: [tran1, tran2]
        };

        const amount = -200;
        const body = {
          accountId: account1.id,
          amount
        };

        td.when(repo.getById(account1.id, 'account')).thenReturn(account1);
        let result = await atmController.makeWithdrawal({repository: repo, request: {body}});
        result.status.should.equal(422);
        result.body.error.should.equal(`A withdrawal of $${body.amount} would result in an overdraft`);
      })
    });

    context('with a good payload, good balance, bad limit', () => {
      it('should persist new transaction', async function() {
        let repo = td.object(repository);
        let captor = td.matchers.captor();

        let tran1 = {
          id: uuid.v4(),
          type: 'deposit',
          amount: 500,
          date: moment().subtract(2, 'day').toISOString()
        };

        let tran2 = {
          id: uuid.v4(),
          type: 'withdrawal',
          amount: -200,
          date: moment().toISOString()
        };

        let account1 = {
          id: uuid.v4(),
          displayName: 'checking',
          type: 'checking',
          dailyWithdrawalLimit: 300,
          transactions: [tran1, tran2]
        };

        const amount = -200;
        const body = {
          accountId: account1.id,
          amount
        };

        td.when(repo.getById(account1.id, 'account')).thenReturn(account1);
        let result = await atmController.makeWithdrawal({repository: repo, request: {body}});
        result.status.should.equal(422);
        result.body.error.should.equal(`You only have $100 available to withdraw at this time`);
      })
    });
  });

  context('when calling makeWithdrawal on controller', () => {
    context('with a bad id', () => {
      it('should return a proper status', async function() {
        let repo = td.object(repository);
        let badId = uuid.v4();
        const body = {
          accountId: badId,
          amount: 200
        };

        td.when(repo.getById(badId, 'account')).thenReturn(undefined);
        let result = await atmController.makeWithdrawal({repository: repo, request: {body}});
        result.status.should.equal(422);
        result.body.error.should.equal(`No Account with ${badId} found`)
      })
    });
  });
});
