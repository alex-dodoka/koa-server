const Router = require('koa2-router');
const Response = require('./../core/Response');

const AppModule = require('core/modules/AppModule');
const users = require('./../core/customCongfig/users.js');

const router = new Router();

const checkAuth = (ctx, next) => {
  const correctUser = users.find(user => user.login == ctx.request.body.login);

  if (correctUser === undefined) return Response.error(ctx, 'User not Found');
  else if (correctUser.password !== ctx.request.body.password) {
    return Response.error(ctx, 'Wrong password');
  }

  next();
};

router.get('/card/list', async ctx => {
  return AppModule.cards(ctx);
});

router.post('/card/create', ctx => {
  return AppModule.createIdea(ctx);
});

router.get('/card/single/:id', ctx => {
  return AppModule.getSingleIdea(ctx);
});

router.delete('/card/:id', ctx => {
  return AppModule.deleteCardById(ctx);
});

router.post('/user', checkAuth, ctx => {
  return AppModule.login(ctx);
});

module.exports = router;
