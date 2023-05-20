const User = require('./../models/usermodel');
const bcryptjs = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv =require('dotenv').config();
const tokengen = async (id)=>{
    try {
      const token = await jwt.sign({_id:id},process.env.JWT_SECRET);
      if(token){
        return token;
      }
    } catch (error) {
        console.log(error.message);
    }
}
const securepassword = async (password)=>{
const salt = await bcryptjs.genSalt(10);
return await bcryptjs.hash(password,salt);
}
const registeruser = async (req,res)=>{
    console.log(req.body.type)
    const hashpasword =await securepassword(req.body.password);
    try {
        const user =await new User({
            name:req.body.name,
            email:req.body.email,
            password:hashpasword,
            mobile:req.body.mobile,
            image:req.file.filename,
            type:req.body.type
        })
        const userdata=await User.findOne({email:req.body.email});
        if(userdata){
            res.status(400).json({
                message:"user already exists"
            })
        }
        const saveuser = await user.save().then(()=>{
            res.status(200).json({
                success:true,
                message:"user registered successfully"
            })
        }).catch(err=>{
            console.log(err.message);
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}
const login = async (req,res)=>{
    try {
       const userdata = await User.findOne({email:req.body.email});
       if(!userdata){
        console.log('user not found');
       }
       const ispassword = await bcryptjs.compare(req.body.password,userdata.password);
       if(!ispassword){
        res.status(404).json({
            status:"fail",
            message:"login detail incorrect"
            
        })
        return
       }
       const token= await tokengen(userdata._id)
       req.session.user_id=userdata._id;
       res.status(200).json({
        status:"success",
        data:userdata,
        token
       })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}
const update_password = async (req,res)=>{
const user_id=req.body._id;
const password = req.body.password;
const user = await User.findOne({_id:user_id});
if(!user){
    res.status(404).json({
        status:"fail",
        message:"user id not found"
    })
}
console.log()
const hashpassword = await securepassword(password);

const updateuser =  await User.findByIdAndUpdate({_id:user_id},{$set:{password:hashpassword}})
if(updateuser){
    res.status(200).json({
        updateuser
        ,message:"password has been changed"
    })
}
}
module.exports ={
    registeruser,
    login,
    update_password
}