const mongoose = require('mongoose');
const subcategoryschema = mongoose.Schema({
    category_id:{
        type:String,
        required:true
    },
    sub_category:{
        type:String,
        required:true
    }
})
const Sub_category = mongoose.model('subcategory',subcategoryschema);
module.exports = Sub_category;