const mongoose=require('mongoose');
const ReviewSchema=new mongoose.Schema({
    orderId:{
        type:Object

    },
    message :{
        type:String
    },
    createdDate:{
        type:Date
    },
    userId:{
        type:Object
    },
    displayName:{
        type:String
    },
    productId:{
        type:Object
    },
    rating:{
        type:Object
    }
});
module.exports=mongoose.model('review',ReviewSchema);