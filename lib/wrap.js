module.exports = {
  wrap: wrap
};

function wrap (fn, ...args) {
  return async (ctx) => {
    const isPost = ctx.method === 'POST';

    try {
      ctx.body = await fn.apply(ctx, [ctx, ...args]);
      ctx.status = isPost ? 201 : 200;
    } catch (err) {
      const code = isPost ? 422 : 412;
      ctx.throw(code, err);
    }
  };
}
