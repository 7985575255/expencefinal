const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");

  try {
    const user = jwt.verify(token, "secretkey");
    
    const getUser = await User.findByPk(user.userId);
    console.log(getUser.dataValues.Id);
    req.user=getUser;
    next()
  } catch (error) {
    console.log(error);
  }
};

module.exports = {authenticate} ;
