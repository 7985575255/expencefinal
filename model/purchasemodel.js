const Sequelize = require("sequelize");
const sequelize = require("../dataBase/userDatabase");


const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  paymentid:{
    type:Sequelize.STRING,
    unique: true
    
  },
  orderid:{
    type:Sequelize.STRING,
    unique: true
  
  } ,
  status:{
    type:Sequelize.STRING,
  
  } 
});

module.exports = Order;