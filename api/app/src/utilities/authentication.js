const repository = require('./repository');
const crypto = require('crypto');

module.exports = async function(username, password) {
  const hash = crypto.createHash('md5').update(password).digest('hex');
  const user = await repository.getByPIN(hash);

  return { user };
};
