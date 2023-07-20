const  Sequelize = require('sequelize');
const sequelize = require('../dataBase/userDatabase'); 

const ForgetPassword = sequelize.define('ForgetPassword', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
});

 module.exports = ForgetPassword;
