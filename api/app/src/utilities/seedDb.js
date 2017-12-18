const repository = require('./repository');
const uuid = require('uuid');
const crypto = require('crypto');

const seedDb = async() => {
  const account1 = {
    id: uuid.v4(),
    displayName: 'checking',
    type: 'checking',
    dailyWithdrawalLimit: 300
  };

  const pin = crypto.createHash('md5').update('1234').digest('hex');
  const user = {
    id: uuid.v4(),
    pin,
    accounts: [account1]
  };

  await repository.saveUser(user);
  await repository.save('account', account1);
};

module.exports = seedDb;
