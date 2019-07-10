const Response = require('core/Response');
const cards = require('../customCongfig/customConfig.js');

class AppModule {
  async ping(ctx) {
    return Response.text(ctx, 'pong');
  }

  async cards(ctx) {
    const result = await ctx.db.query('select * from ideas');
    ctx.body = result.rows;
  }

  async createIdea(ctx) {
    const { title, description, author } = ctx.request.body;
    console.log(ctx.request.body);
    const result = await ctx.db.query(
      'insert into ideas (title, description,author) values ($1, $2,$3) RETURNING *',
      [title, description, author]
    );
    ctx.body = result.rows[0];
  }

  async getSingleIdea(ctx) {
    return Response.json(
      ctx,
      cards.ideasCard.filter(card => card.id == ctx.params.id)
    );
  }

  async deleteCardById(ctx) {
    const indexOfIdea = ctx.request.params.id;
    const indexOfDeletedCard = cards.ideasCard.findIndex(card => {
      card.id === Number(indexOfIdea);
    });
    const deletedCard = cards.ideasCard.splice(indexOfDeletedCard, 1);

    return Response.json(ctx, deletedCard);
  }

  async login(ctx) {
    return Response.success(ctx);
  }
}

module.exports = new AppModule();
