require('dotenv').load({silent: true});

const Koa = require('koa');
const Boom = require('boom');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const logger = require('koa-logger');

require('./core/db')();

const task = require('./api/task');

const app = new Koa();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}
app.use(cors());
app.use(bodyParser());

app.use((ctx, next) => {
  ctx.boom = Boom;
  return next();
});

app.use(task.routes());

const server = app.listen(process.env.PORT || 3000).on('error', err => {
  console.error(err);
});

module.exports = server;
