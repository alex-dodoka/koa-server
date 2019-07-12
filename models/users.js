const Sequelize = require('sequelize');
const sequelize = require('../lib/database');

const Users = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    user_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
  },
  { sequelize, timestamps: false }
);

module.exports = Users;
