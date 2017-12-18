const winston = require('winston');

module.exports = function() {
  return async(ctx, next) => {
    try {
      await next();
      if (ctx.response.status === 404 && !ctx.response.body) {
        ctx.throw(`There is no endpoint that matches the url:${ctx.host}${ctx.url}`);
      }
    } catch (err) {
      winston.error(err);
      ctx.status = err.statusCode || err.status || 500;
      console.log(`==========err=========`);
      console.log(err);
      console.log(`==========END err=========`);

      ctx.body = {
        status: ctx.status,
        errors: [{message: err.message}]
      };
    }
  };
};
