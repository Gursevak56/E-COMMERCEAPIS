const Sub_category = require('./../models/subCategorymodel');
const subcategory = require('./../models/subCategorymodel');
const addsubcategory = async (req,res)=>{
    try {
        const subdata = await subcategory.find({category_id:req.body.category_id});
        if(subdata.length>0){
            let cheking = false;
            for (let index = 0; index < subdata.length; index++) {
                if(subdata[index]['sub_category']===req.body.sub_category);
                cheking = true;
                break;
            }
            if(cheking == true){
                res.status(400).json({
                    status:'fail',
                    message:"sub-category already exists"
                })
            }
            else{
                const newsubcategory = await Sub_category.create({
                    category_id:req.body.category_id,
                    sub_category:req.body.sub_category
                })
                const savedsubcategory = await newsubcategory.save().then(()=>{
                    console.log('sub-category added successfully');
                }).catch(err=>{
                    console.log(err.message)
                })
            }
        }
        const addsubcategory = new Sub_category({
            category_id:req.body.category_id,
            sub_category:req.body.sub_category
        })
       const addeddata=await addsubcategory.save().then(()=>{
            console.log('subcategory added successfully');
        }).catch(err=>{
            console.log(err.message);
        })
    res.status(400).json({
        status:"pass",
        message:addeddata
    })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
module.exports = {
    addsubcategory
}