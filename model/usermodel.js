const Sequelize=require('sequelize');
const userdb=require('../dataBase/userDatabase');

const User=userdb.define('users', {
    Id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull:false
    },
   name:{
    type: Sequelize.STRING,
    allowNull:false
   },
   email:{
    type :Sequelize.STRING,
    unique:true,
    allowNull:false
   },
   password:{
    type: Sequelize.STRING,
    allowNull :false
   },
   ispremimumuser:{
    type:Sequelize.BOOLEAN,
    defaultValue: false
   },
   totalExpence:{
    type: Sequelize.INTEGER,
    defaultValue:0
   }
});
module.exports=User;