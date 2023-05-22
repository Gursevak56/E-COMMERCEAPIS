const jwt = require('jsonwebtoken');
const User = require('./../models/usermodel');
const verifytoken = async (req,res,next)=>{
    let testtoken;
    const token =req.body.token||req.query.token||req.headers.authorization;
    if(token && token.startsWith('Bearer')){
        testtoken = token.split(' ')[1];
    }
    if(!testtoken){
        res.status(404).json({
            status:"fail",
            message:'token not found'
        })
    }
    console.log(testtoken)
    const decode = jwt.verify(testtoken,process.env.JWT_SECRET);
    console.log(decode)
    const user = await User.findOne({_id:decode._id});
    req.user=user;
    return next();
}
module.exports = verifytoken;