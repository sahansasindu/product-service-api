const mongoose=require('mongoose');
const DiscountSchema=new mongoose.Schema({
    discountName:{
        type:String,
        required:true
    },
    percentage :{
        type:Number,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    startDate:{
        type:Date
    },
    EndDate:{
        type:Date
    },
    LastUpdate:{
        type:Date
    }
});
module.exports=mongoose.model('discount',DiscountSchema);