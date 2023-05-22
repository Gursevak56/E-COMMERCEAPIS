// const Category = require('./../models/categoryModle');
// const checkDuplicateValue =async (req,res,next)=>{
//     const categorybody = req.body.Category;
//     console.log(categorybody)
//     const categorydata =await Category.find();
//     console.log(categorydata[0]['category'])
//    let checking = false;
//    console.log(categorydata.length)
//     if(categorydata.length>0){
//         for(let i = 0; i<=categorydata.length;i++){
//             console.log(categorydata[i]['category'])
//             if(categorydata[i]['category'] === categorybody){
//                 console.log('Mfatch')
//                 checking=true;
//                 break;
//             }
//     }    }
//     console.log(checking)
// if(!checking){
//    return next();
// }
// else{
//     res.status(404).json({
//         status:'fail',
//         message:"duplicate key"
//     })
//     return
// }
// }
// if(!checking){
//     return next();
//  }
// }
// module.exports = checkDuplicateValue;