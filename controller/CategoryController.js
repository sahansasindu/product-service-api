const CategorySchema=require('../model/CategorySchema');
const createCategory =async (request,response)=>{
    const category=new CategorySchema({
        categoryName:request.body.categoryName,
        icon:{
            hash:'Temp Hash',
            resourceUrl:'',
            fileName:'Temp FIle name ',
            directory:''},
        availableCountries:[
            {
                countryId:'Temp-Id-1',
                countryName:'Sri lanka,'
            },
            {
                countryId:'Temp-Id-2',
                countryName:'USA,'
            }
        ],

    });
    category.save().then(result=>{
        response.status(201)

    }).catch(err=>{

    })

}
const updateCategory =async (request,response)=>{
    console.log(request.body);
}
const deleteCategory =async (request,response)=>{
    console.log(request.body);
}
const findCategoryById =async (request,response)=>{
    console.log(request.body);
}
const findAllCategory =async (request,response)=>{
    console.log(request.body);
}

module.exports={
    createCategory,updateCategory,deleteCategory,findAllCategory,findCategoryById
}