const Sequelize=require('sequelize');
const sequelize=require('../dataBase/userDatabase');

const Expence=sequelize.define('expences', {
    Id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    product:{
        type:Sequelize.STRING,
        unique:true
    },
    price:{
        type:Sequelize.INTEGER
    },
    option:{
        type:Sequelize.STRING
    }
});
module.exports=Expence;