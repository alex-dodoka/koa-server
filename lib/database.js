const Sequelize = require('sequelize');

const sequelize = new Sequelize('ideas_db', 'dodoka', '1369870oO', {
  host: '10.10.63.155',
  dialect: 'postgres'
});

module.exports = sequelize;
