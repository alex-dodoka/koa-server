const Response = require('core/Response');
const { Op } = require('sequelize');

const Ideas = require('./../../models/ideas.js');
const Users = require('./../../models/users.js');

Users.hasMany(Ideas);

class AppModule {
  async cards(ctx) {
    const ideasCard = await Ideas.findAll();
    ctx.body = ideasCard;
  }

  async createIdea(ctx) {
    const { title, description, userId = 4 } = ctx.request.body;
    const newIdea = await Ideas.create(
      { title, description, userId },
      {
        fields: ['title', 'description', 'userId']
      }
    );
    ctx.body = newIdea;
  }

  async getSingleIdea(ctx) {
    return Response.json(
      ctx,
      cards.ideasCard.filter(card => card.id == ctx.params.id)
    );
  }

  async deleteCardById(ctx) {
    const indexOfIdea = ctx.request.params.id;

    const savedCardBeforeDeleted = await Ideas.findAll({
      where: {
        id: indexOfIdea
      }
    });
    await Ideas.destroy({
      where: {
        id: indexOfIdea
      }
    });
    return Response.json(ctx, savedCardBeforeDeleted);
  }

  async login(ctx) {
    return Response.success(ctx);
  }

  async getCardByAuthUser(ctx) {
    const cardByUser = ctx.session;
    console.log(cardByUser.userId);

    const ideasByUserID = await Ideas.findAll({
      where: {
        user_id: cardByUser.userId
      }
    });
    ctx.body = ideasByUserID;
  }
}

module.exports = new AppModule();
