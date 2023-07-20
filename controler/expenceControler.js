const Expence = require('../model/expencemodel');
const User = require('../model/usermodel');
const userdb = require('../dataBase/userDatabase');
const S3Service=require('../service/s3service');

const downloadExp=async (req,res,getData)=>{

  try{
const getExpen=await Expence.findAll();
const userId=req.user.dataValues.Id;
const stingfideexpence=JSON.stringify(getExpen);
const fileName=`Expence${userId}/${new Date()}.txt`;
const fileUrl=await S3Service.uploadToS3(stingfideexpence,fileName)
 res.status(200).json({fileUrl})
 }
 catch(err){
    console.log("somthing went wrong and this is a catch block");
    res.status(500).json({fileUrl:"", err:err})
  }
}

const getData = async (req, res) => {
  try {
    const data = await Expence.findAll({ where: { userId: req.user.dataValues.Id } });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

const addData = async (req, res) => {
  const t = await userdb.transaction();
  try {
    const { product, price, option } = req.body;
    const data = await Expence.create(
      { product: product, price: price, option: option, userId: req.user.dataValues.Id },
      { transaction: t }
    );
    const totalExpence = Number(req.user.dataValues.totalExpence) + Number(price);
    await User.update(
      { totalExpence: totalExpence },
      { where: { Id: req.user.dataValues.Id }, transaction: t }
    );
    await t.commit();
    res.status(201).json({ newData: data });
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.status(500).json({ error: 'Failed to add data' });
  }
}; 

const deleteData = async (req, res) => {
    const t = await userdb.transaction();
  try {
    const price = req.query.price;
    const user_id = req.params.Id;
    if (!user_id) {
      res.status(400).json({ error: 'Id is missing' });
    }
    await Expence.destroy({ where: { Id: user_id, userId: req.user.dataValues.Id },transaction:t});
    const user = await User.findOne({ where: { Id: req.user.dataValues.Id },transaction:t });
    const totalExpence=user.totalExpence-price;
    await User.update({ totalExpence: totalExpence }, { where: { Id: req.user.dataValues.Id } ,transaction:t});
    await t.commit();
    res.sendStatus(200);
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.status(500).json({ error: 'Failed to delete data' });
  }
};
module.exports={getData,downloadExp,deleteData,addData}