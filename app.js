const express=require('express');
const path=require('path');
const morgan = require('morgan')
const helmet=require("helmet");

const sequelize=require('./dataBase/userDatabase')
const routeruser=require('./routes/userroute')
const routerexpence=require('./routes/expenceroute');
const routerpurchse=require('./routes/membershiprout');
const routerleaderbord=require('./routes/leaderbordrout');
const routerforgetpassword=require('./routes/forgetPasswodroute')
const cors=require('cors');

const Order=require('./model/purchasemodel')
const User=require('./model/usermodel');
const Expence=require('./model/expencemodel')
const dotenv = require('dotenv');

const app=express();
dotenv.config();
User.hasMany(Expence);
Expence.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
app.use(cors());

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       "script-src": ["'self'", "cdn.jsdelivr.net", "checkout.razorpay.com", "cdnjs.cloudflare.com"],
//       "frame-src": ["'self'", "https://api.razorpay.com"],
//     },
//   })
// )
// app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use('/password',routerforgetpassword);
app.use('/get',routerleaderbord);
app.use('/purchase',routerpurchse);
app.use('/user', routeruser);
app.use('/user/expence', routerexpence)
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`public/${req.url}`));
})


sequelize.sync().then((result) => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });