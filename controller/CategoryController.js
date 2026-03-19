const CategorySchema=require('../model/CategorySchema');
const createCategory =async (request,response)=>{

    try{

        const { categoryName, icon, availableCountries } = request.body;
        if(!categoryName || !icon || !availableCountries){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }

        const category=new CategorySchema({
            categoryName: categoryName,
            icon: icon,
            availableCountries: availableCountries
        });
        const saveData=await category.save();
        console.log(saveData);
        return response.status(201).json({code:201,message:'category has been saved..',data:saveData})

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

        return response.status(200).json({code:200,message:'category has been updated..',data:updateData})

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

        if(deletedData){
            return response.status(200).json({code:200,message:'category has been deleted successfully',data:deletedData})
        }else{
            return response.status(404).json({code:404,message:'category not found',data:null})
        }

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findCategoryById =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const categoryData=await CategorySchema.findById(
            {'_id':request.params.id});
        if(categoryData){
            return response.status(200).json({code:200,message:'category data..',data:categoryData})
        }

        response.status(404).json({ code: 404, message: 'category data not found...', error: err.message });


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findAllCategory =async (request,response)=>{

    try{

        const {searchText,page=1,size=10}=request.query;
        const pageIndex=parseInt(page);
        const pageSize=parseInt(size);

        const query={};
        if(searchText){
            query.$text={$search:searchText}
        }
        const skip=(pageIndex-1)*pageSize;
        const categoryList=await CategorySchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const categoryListCount=await CategorySchema.countDocuments();
        return response.status(200).json({code:200,message:'category data..',data:{list:categoryList,categoryListCount}})


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });

    }




}

module.exports={
    createCategory,updateCategory,deleteCategory,findAllCategory,findCategoryById
}