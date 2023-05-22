const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    category:{
        type:String,
        required:true
    }
})
const Category = mongoose.model('category',categorySchema);
module.exports = Category;