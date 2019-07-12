const Router = require('koa2-router');
const Response = require('./../core/Response');

const AppModule = require('core/modules/AppModule');

const Users = require('./../models/users.js');

const router = new Router();

const checkAuth = async (ctx, next) => {
  const { email='alex@mail.ru', password='11111' } = ctx.request.body;

  const correctUser = await Users.findOne({
    where: {
      email: email
    },
    raw: true
  });

  if (correctUser === undefined) return Response.error(ctx, 'User not Found');
  else if (correctUser.password !== password) {
    return Response.error(ctx, 'Wrong password');
  }
  ctx.session.userId = correctUser.id;
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

router.get('/myCards', ctx => {
  return AppModule.getCardByAuthUser(ctx);
});

module.exports = router;
