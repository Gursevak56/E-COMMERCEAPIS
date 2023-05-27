const express = require('express');
const router = express.Router();
 const multer = require('multer');
 const path = require('path');
 const addproductcontroller = require('./../controllers/addproductcontroller');
 const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../public/productimage'));
    },
    filename: function(req,file,cb){
        const name = Date.now()+''+file.originalname;
        cb(null,name);
    }
 })
 const upload = multer({storage:storage});
 router.post('/newproduct',upload.array('images'),addproductcontroller.addproduct)
module.exports = router;