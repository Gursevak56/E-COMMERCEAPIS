const Category = require('./../models/categoryModle');
const addcategory = async (req,res)=>{
try {
    
} catch (error) {
    res.status(404).json({
        status:"fail",
        message:error.message
    })
}
}

module.exports={
    addcategory
}