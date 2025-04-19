const mongoose=require('mongoose');
const CartSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId :{
        type:Object
    },
    qty:{
        type:Number
    },
    createDate:{
        type:Date
    },

});
module.exports=mongoose.model('cart',CartSchema);