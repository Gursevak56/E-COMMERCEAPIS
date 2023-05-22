const mongoose = require('mongoose');
const storeSchema = mongoose.Schema({
    vendor_id:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    bussiness_email:{
        type:String,
        requried:true
    },
    address:{
        type:String,
        requried:true
    },
    pin:{
        type:String,
        requried:true
    },
    location:{
        type:{type:String,required:true},
        coordinates:[]
    }
})
storeSchema.index({location:'2dsphere'});
const Store = mongoose.model('store',storeSchema);
module.exports = Store;