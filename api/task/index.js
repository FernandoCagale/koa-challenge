const Router = require('koa-router');
const lib = require('../../lib/wrap');

const router = Router();

router.get('/v1/tasks', lib.wrap(async (ctx) => {
  return [{id: 1}, {id: 2}];
})).get('/v1/tasks/:id', lib.wrap(async ({ params: { id } }) => {
  return {id: id};
})).post('/v1/tasks', lib.wrap(async ({ request: { body } }) => {
  return body;
})).put('/v1/tasks/:id', lib.wrap(async ({ params: { id }, request: { body } }) => {
  return {body, id: id};
})).delete('/v1/tasks/:id', lib.wrap(async ({ params: { id } }) => {
  return {id: id};
}));

module.exports = router;
