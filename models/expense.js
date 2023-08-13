const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    autoNull: false,
    primaryKey: true
  },

  description: {
    type: Sequelize.TEXT,
    autoNull: false,
  },

 category: {
    type: Sequelize.STRING,
    autoNull: false,
  },

 amount: {
    type: Sequelize.DECIMAL,
    autoNull: false
  }

});

module.exports = Expense;