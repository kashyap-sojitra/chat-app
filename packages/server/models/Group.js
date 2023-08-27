const Sequelize = require('sequelize');
const sequelize = require('../db');

const Group = sequelize.define('Group', {
  groupname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  groupid: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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

module.exports = Group;
