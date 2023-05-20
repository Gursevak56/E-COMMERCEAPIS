const jwt = require('jsonwebtoken');
const User = require('./../models/usermodel');
const verifytoken = async (req,res,next)=>{
    const token =req.body.token||req.query.token||req.headers.authorization;
    if(!token){
        res.status(404).json({
            status:"fail",
            message:'token not found'
        })
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findOne({_id:decode._id});
    req.user=user;
    return next();
}
module.exports = verifytoken;