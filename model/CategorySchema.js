const mongoose=require('mongoose');
const CategorySchma=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
        },
    icon:{
        type:Object
    },
    availableCountries:{
        type:Array
    }
});
module.exports=mongoose.model('category',CategorySchma);