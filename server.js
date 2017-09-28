require('dotenv').load({silent: true});

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const task = require('./api/task');

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(task.routes());

app.listen(process.env.PORT || 3000);
