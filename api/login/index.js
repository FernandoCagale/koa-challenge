const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/v1/login', (ctx) => {
  if (ctx.request.body.user === 'koa' && ctx.request.body.password === 'password') {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({ role: 'admin' }, 'secret'),
      message: 'Successfully logged in!'
    };
  } else {
    ctx.status = ctx.status = 401;
    ctx.body = {
      message: 'Authentication failed'
    };
  }
  return ctx;
});

module.exports = router;
