const Expence = require("../model/expencemodel");
const User = require("../model/usermodel");
const sequelize=require('../dataBase/userDatabase')

const getExpence = async (req,res) => {
    try{
 const leaderboard=await User.findAll({
    attributes: ['name', 'totalExpence'], 
      order: [['totalExpence', 'DESC']]
});
 res.json(leaderboard);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getExpence };
