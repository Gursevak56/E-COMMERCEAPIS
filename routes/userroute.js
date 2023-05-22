const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usercontroller = require('./../controllers/usercontroller');
const jwtauth = require('./../middleware/auth');
const { userInfo } = require('os');
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userimages'))
    },
    filename:function(req,file,cb){
        const name =Date.now()+'_'+file.originalname;
        cb(null,name)
    }
})
const upload =multer({storage:storage});
router.post('/register',upload.single('image'),usercontroller.registeruser);
router.post('/login',usercontroller.login);
router.get('/text',jwtauth,(req,res,next)=>{
    res.status(200).json({
        status:"success",
        message:"token verified"
    })
})
//update password
router.post('/update-password',jwtauth,usercontroller.update_password);
router.post('/forget-password',usercontroller.forgetpassword)
router.get('/reset-password/:token',usercontroller.resetpassword);
module.exports = router;