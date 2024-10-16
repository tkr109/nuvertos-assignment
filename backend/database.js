const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chemical_db', 'root', 'Omaxe@20', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4' 
  },
  logging: false,  
});

module.exports = sequelize;
