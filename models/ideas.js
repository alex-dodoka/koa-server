const Sequelize = require('sequelize');
const sequelize = require('../lib/database');
const Users = require('./users.js');

const Ideas = sequelize.define(
  'ideas',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    author: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    is_public: Sequelize.BOOLEAN,
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { sequelize, timestamps: false, underscored: true }
);

Ideas.belongsTo(Users, { foreignKey: 'user_id', targetKey: 'id' });
module.exports = Ideas;
