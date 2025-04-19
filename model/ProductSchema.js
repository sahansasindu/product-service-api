const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    images :{
        type:Array
    },
    actiualPrice:{
        type:Number
    },
    oldPrice:{
        type:Number
    },
    qty:{
        type:Number
    },
    description:{
        type:Number
    },
    discount:{
        type:Object
    },
    categoryId:{
        type:Number
    }
});
module.exports=mongoose.model('product',ProductSchema);