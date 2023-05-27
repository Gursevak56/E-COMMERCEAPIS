const Product = require('./../models/addproductmodel');
const addproduct = async (req,res)=>{
    try {
        console.log(req.files.length)
        var arrimages = [];
        for(let i = 0;i<req.files.length ;i++){
             arrimages[i] == req.files[i].filename;
        }
        const product = new Product({
            vendor_id:req.body.vendor_id,
            store_id:req.body.store_id,
            name:req.body.name,
            price:req.body.price,
            discount:req.body.discount,
            category_id:req.body.category_id,
            sub_category_id:req.body.sub_category_id,
            images:arrimages
        })
        if(!product){
            console.log('product is not save');
        }
        const savedproduct = await product.save().then(()=>{
            console.log('product saved successfully');
        }).catch(err=>{
            console.log(err.message);
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:req.files.length
        })
    }
}
module.exports = {
    addproduct
}