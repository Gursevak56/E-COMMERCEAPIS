const User = require('./../models/usermodel');
const bcryptjs = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv =require('dotenv').config();
const sendemail = require('./../middleware/sendemail')
const Randomstring = require('randomstring');
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
    console.log(password)
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
       console.log(ispassword)
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
const forgetpassword = async (req,res)=>{
    const email = req.body.email;
    if(!email){
        res.status(404).send({
            message:"email not found"
        })
        return
    }
    const user = await User.findOne({email:email});
    if(!user){
        res.status(400).json({
            status:"fail",
            message:"user not found"
        })
        return
    }
    const token = Randomstring.generate(14);
    const updateduser = await User.findByIdAndUpdate({_id:user._id},{$set:{resettoken:token}})
    if(!updateduser){
        res.status.json({
            status:"fail",
            message:'token not available in the database'
        })
        return
    }
   await sendemail({
        name:user.name,
        id:user._id,
        token:token,
        email:user.email,
        subject:'regarding reset password'
    })
    res.status(200).json({
        status:"success",
        message:"email send successfully"
    })
}
const resetpassword = async (req,res)=>{
  const token =req.params.token;
  if(!token){
    res.status(404).json({
        status:"fail",
        message:"reset token not found"
    })
    return
  }
  const user = await User.findOne({resettoken:token});
  if(!user){
    res.status(400).json({
        status:"fail",
        message:"user not found"
    })
    return
  }
  const password = securepassword(req.body.password);
 const updatepass= await User.findByIdAndUpdate({_id:user._id},{$set:{password:password}});
 if(!updatepass){
    res.status(404).json({
        status:'fail',
        message:"password not updated"
    })
 }
 res.status(200).json({
    status:"success",
    updatepass
})
}

module.exports ={
    registeruser,
    login,
    update_password,
    forgetpassword,
    resetpassword
}