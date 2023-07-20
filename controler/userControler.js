
const userModel=require('../model/usermodel');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')


const registerUser=async function(req,res){
     let {name,email,password}=req.body;
    try{
       const register=await userModel.findAll({where:{email:email}})
         if(register.length>0){
         res.status(500).json({ errormsg: "User already exists with this email Id" }); 
         } else{
            let saltRounds=10;
            bcrypt.hash(password, saltRounds, async(err, hash)=> {
               if(err){
                  console.log(err)
               }else{
                   await userModel.create({name, email, password:hash});
               }
           
           })
            res.status(201).json({ succesMassage:"registeruser succesfully", userModel})
        }
     }catch(err){
      console.log(err);
    }
}

const generateAccessToken=(id,name, ispremimumuser)=> {
    return jwt.sign({ userId: id , name:name, ispremimumuser}, "secretkey");
}


const loginUser=async function(req,res){
 const {email, password}=req.body;
    try{
  
   const registeruser=await userModel.findOne({where: {email:email}});
      console.log(registeruser);
   if(!registeruser){
    res.send('<h1> Invalid credentials</h1>')
    return;
   }
   const isMatch = await bcrypt.compare(password, registeruser.password);
   if(isMatch){
    
    res.status(201).json({message: "login succesfully", token:generateAccessToken(registeruser.Id,registeruser.name,registeruser.ispremimumuser)})
    }else{
    res.send('home page is not comming');
 }
 }catch(err){
       res.send(err);
    }
}
module.exports={loginUser,registerUser,generateAccessToken};