const auth = async ctx => {
  if (!ctx.state.user) {
    ctx.status = 401;
    ctx.body = { success: false, errors: ['Invalid credentials provided'] };
    return ctx;
  }

  const user = ctx.state.user;
  ctx.body = { user };
  ctx.status = 201;
};


const checkAuth = async function(ctx) {
  if (ctx.state.user) {
    ctx.status = 200;
    ctx.body = { success: true, user: ctx.state.user };
  } else {
    ctx.status = 401;
  }
};

module.exports = {
  auth,
  checkAuth
};
