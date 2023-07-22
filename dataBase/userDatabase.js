const Sequelize=require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.USERNAM);
const userdb=new Sequelize(process.env.TABLE,process.env.USERNAM,process.env.PASSWORD,{
    dialect: 'mysql', host: process.env.HOST});
    module.exports=userdb;