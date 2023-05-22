const Category = require('./../models/categoryModle');
const addcategory = async (req,res)=>{
try {
    if(!req.body){
        res.status(404).json({
            status:"fail",
            message:"NOT FOUND"
        })
        return
    }  
    const category = req.body.Category;
    const categorydata =await Category.find();
    console.log(categorydata[0]['category'])
   let checking = false;
   console.log(categorydata.length)
    if(categorydata.length>0){
        categorydata.forEach((item)=>{
            let categorycoll = item.category;
            if(categorycoll=== category){
                checking=true;
            }
        })
            
    
    if(!checking){
        const newcategory = await new Category({
            category:category
        })
        const savedcategory = await newcategory.save();
        res.status(200).json({
            status:"success",
            message:"you are very successfully add a new category",
            newcategory
        })
     }
     else{
         res.status(404).json({
             status:'fail',
             message:"duplicate key"
         })
         return
     } 
  }
    
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