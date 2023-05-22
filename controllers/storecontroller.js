const Store = require('./../models/storemodel');
const User = require('./../models/usermodel');
const createstore = async (req,res)=>{
    console.log(req.body)
    try {
        const userdata = await User.findOne({_id:req.body.vendor_id});
        if(!userdata){
            res.status(404).json({
                status:"fail",
                message:"userdata with this vender_id not found"
            })
            return
        }
        if(!req.body.latitude && !req.body.longitude){
            res.status(404).json({
                status:"fail",
                message:"coordinate not found"
            })
            return
        }
        const vendor = await Store.findOne({vendor_id:req.body.vendor_id});
        if(vendor){
            res.status(400).json({
                status:"fail",
                message:"vendor has already a store"
            })
            return
        }
        const store = new Store({
            vendor_id:req.body.vendor_id,
            logo:req.file.filename,
            bussiness_email:req.body.bussiness_email,
            address:req.body.address,
            pin:req.body.pin,
            location:{
                type:"Point",
                coordinates:[parseFloat(req.body.longitute),parseFloat(req.body.latitude)]
            }
        })
       const storedata = await store.save();
       res.status(200).json({
        data:storedata
       })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}
module.exports ={
    createstore
}