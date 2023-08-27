const Sequelize = require('sequelize');
const sequelize = require('../db');

const Message = sequelize.define('Message', {
  content: {
    type: Sequelize.STRING
  },
  userTo: {
    type: Sequelize.STRING
  },
  userfrom: {
    type: Sequelize.STRING
  },
  groupId: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

module.exports = Message;
