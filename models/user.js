const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    autoNull: false,
    primaryKey: true
  },

  name: Sequelize.STRING,

  email: {
    type: Sequelize.STRING,
    autoNull: false,
    unique:true
  },

 password: {
    type: Sequelize.CHAR,
    autoNull: false
  },

});

module.exports = User;