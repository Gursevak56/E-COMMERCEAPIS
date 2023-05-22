const express =require('express');
const storeroute = express.Router();
const multer = require('multer');
const auth = require('./../middleware/auth');
const storecontroller = require('./../controllers/storecontroller');
const path = require('path')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/storeimage'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+''+file.originalname;
        cb(null,name);
    }
})
const upload = multer({storage:storage});
storeroute.post('/createstore',auth,upload.single('logo'),storecontroller.createstore)
module.exports = storeroute;
