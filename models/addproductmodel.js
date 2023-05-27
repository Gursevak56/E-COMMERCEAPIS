const mongoose = require('mongoose');
const productschema =  mongoose.Schema({
    vendor_id:{
        type:String,
        required:true
    },
    store_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    category_id:{
        type:String,
        required:true
    },
    sub_category_id:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    }
})
const Product = mongoose.model('product',productschema);
module.exports = Product;