const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const config = require('config');
const mainRoutes = require('routes/main');

const database = require('../lib/database');

const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'usersess',
  maxAge: 600000
};

app.init = async () => {
  app.use(
    cors({
      credentials: true
    })
  );

  app.use(session(CONFIG, app));

  app.use(bodyParser());
  await database.sync({ forse: false });
  app.context.sequelize = database;

  // routes
  app.use(mainRoutes);
};

module.exports = app;
