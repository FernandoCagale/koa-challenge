const Router = require('koa-router');
const taskModel = require('./model');
const lib = require('../../lib/wrap');

const router = Router();

router.get('/v1/tasks', lib.wrap(async () => {
  await taskModel.find({});
})).get('/v1/tasks/:id', lib.wrap(async ({ boom, params: { id } }) => {
  const task = await taskModel.findOne({_id: id});
  if (!task) return boom.notFound(`Task not found ${id}`);
  return task;
})).post('/v1/tasks', lib.wrap(async ({ request: { body } }) => {
  await taskModel.create(body);
})).put('/v1/tasks/:id', lib.wrap(async ({ boom, params: { id }, request: { body } }) => {
  const task = await taskModel.findOneAndUpdate({_id: id}, body, { new: true });
  if (!task) return boom.notFound(`Task not found ${id}`);
  return task;
})).delete('/v1/tasks/:id', lib.wrap(async ({ boom, params: { id } }) => {
  const task = await taskModel.findOne({_id: id});
  if (!task) return boom.notFound(`Task not found ${id}`);
  await taskModel.remove({_id: id});
}));

module.exports = router;
