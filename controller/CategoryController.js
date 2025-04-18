const CategorySchema=require('../model/CategorySchema');
const createCategory =async (request,response)=>{

    try{

        const { categoryName, file, countryIds } = request.body;
        if(!categoryName || !file || !countryIds){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }

        const category=new CategorySchema({
            categoryName:request.body.categoryName,
            icon:{
                hash:'Temp Hash',
                resourceUrl:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dogster.com%2Fdog-breeds%2Fsiberian-husky&psig=AOvVaw3OsoJffBOD68J582Yo3wjO&ust=1745048997121000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJC4k6KM4YwDFQAAAAAdAAAAABAE',
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
        const saveData=await category.save();
        console.log(saveData);
        return response.status(201).json({code:201,message:'customer has been saved..',data:saveData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }





}
const updateCategory =async (request,response)=>{

    try{

        const { categoryName} = request.body;

        if(!categoryName){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const updateData=await CategorySchema.findOneAndUpdate(
            {'_id':request.params.id},
            {$set:{categoryName: categoryName}},
            {new:true});

        return response.status(200).json({code:200,message:'customer has been updated..',data:updateData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }


}
const deleteCategory =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const deletedData=await CategorySchema.findOneAndDelete(
            {'_id':request.params.id});

        return response.status(204).json({code:204,message:'customer has been deleted..',data:deletedData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
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