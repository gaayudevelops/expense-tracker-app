const Sequelize = require('sequelize');

const sequelize= new Sequelize('expense-tracker','root','Restin@mysql',{
dialect:'mysql',
host:'localhost'
});

module.exports= sequelize;