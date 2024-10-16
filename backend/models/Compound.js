const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Compound = sequelize.define('Compound', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CompoundName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CompounrDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  strImageSource: {
    type: DataTypes.STRING,
    allowNull: true  
  },
  strImageAttribution: {
    type: DataTypes.STRING,
    allowNull: true  
  },
  dateModified: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: false  
});

module.exports = Compound;
