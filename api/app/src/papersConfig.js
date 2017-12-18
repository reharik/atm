const paperslocal = require('papers-local');
const koapapers = require('koa-papers');
const auth = require('./utilities/authentication');

module.exports = function() {
  let serialize = function(user) {
    return user;
  };

  let deserialize = function(user) {
    return user;
  };

  let local = paperslocal(auth, { usernameField: 'value', passwordField: 'value' });
  let config = {
    strategies: [local],
    useSession: true,
    serializers: [serialize],
    deserializers: [deserialize],
    whiteList: [{ url: '/swagger', method: 'GET' }]
  };

  return koapapers().registerMiddleware(config);
};
