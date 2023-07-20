const razorpay=require('razorpay');
const Order=require('../model/purchasemodel')
const userControler=require('./userControler')
exports.purchasepremium = async (req, res) => {
    try {
      var rzp = new razorpay({
        key_id:process.env.RAZORPAY_KEY_ID ,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });
      const amount = 2500;
  
    let order=await rzp.orders.create({ amount, currency: "INR" }) 
         if(!order){
            throw new Error(JSON.stringify(Error))
         }
       
    let premium=await req.user.createOrder({ orderid: order.id, status: "PENDING" })
         res.status(201).json({ order, key_id: rzp.key_id });
        }catch(err){
            console.log(err);
        }
}

      
  exports.updateTransactionStatus = async (req, res) => {
    try {
      const id=req.user.dataValues.Id;
      const { payment_id, order_id } = req.body;
       const order=await Order.findOne({ where: { orderid: order_id }});
        const promise1= order.update({ paymentid: payment_id, status: "SUCCESSFUL" });
        const promise2=req.user.update({ispremimumuser:true});
        Promise.all([promise1,promise2]).then(()=>{
           return res.status(201).json({ sucess: true, message: "Transaction Successful",token:userControler.generateAccessToken(id,undefined,true) });

          }).catch((err)=>{

         console.log(err)
        })} catch (err) {
      res.status(403).json({ errpr: err, message: "Something went wrong" });
    }

}