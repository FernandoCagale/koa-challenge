require('dotenv').load({silent: true});

require('./core/db')();

const Koa = require('koa');
const Boom = require('boom');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const task = require('./api/task');

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use((ctx, next) => {
  ctx.boom = Boom;
  return next();
});

app.use(task.routes());

app.listen(process.env.PORT || 3000);

module.exports = app;
