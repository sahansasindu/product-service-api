const ProductSchema=require('../model/ProductSchema');
const createProduct =async (request,response)=>{

    try{

        const {  productName,   images,  actiualPrice, oldPrice,  qty,  description,    discount,   categoryId } = request.body;
        if( !productName || !images ||  !actiualPrice || !oldPrice ||  !qty ||  !description || !discount || !categoryId){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }

        const category=new ProductSchema({
            productName:productName,
            image:{
                hash:'Temp Hash',
                resourceUrl:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dogster.com%2Fdog-breeds%2Fsiberian-husky&psig=AOvVaw3OsoJffBOD68J582Yo3wjO&ust=1745048997121000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJC4k6KM4YwDFQAAAAAdAAAAABAE',
                fileName:'Temp FIle name ',
                directory:'Temp directory '
            },
            actiualPrice:actiualPrice,
            oldPrice:oldPrice,
            qty:qty,
            description:description,
            discount:discount,
            categoryId:categoryId

        });
        const saveData=await category.save();
        console.log(saveData);
        return response.status(201).json({code:201,message:'product has been saved..',data:saveData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }





}
const updateProduct =async (request,response)=>{

    try{
        const {  productName,actiualPrice, oldPrice,  qty,  description,    discount,   categoryId } = request.body;
        if( !productName || !actiualPrice || !oldPrice ||  !qty ||  !description || !discount || !categoryId){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }

        const updateData=await ProductSchema.findOneAndUpdate(
            {'_id':request.params.id},
            {$set:{
                    productName:productName,
                    actiualPrice:actiualPrice,
                    oldPrice:oldPrice,
                    qty:qty,
                    description:description,
                    discount:discount,
                    categoryId:categoryId
            }},
            {new:true});

        return response.status(200).json({code:200,message:'product has been updated..',data:updateData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }


}
const deleteProduct =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const deletedData=await ProductSchema.findOneAndDelete(
            {'_id':request.params.id});

        return response.status(204).json({code:204,message:'product has been deleted..',data:deletedData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findProductById =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const productData=await ProductSchema.findById(
            {'_id':request.params.id});
        if(productDataData){
            return response.status(200).json({code:200,message:'product data..',data:productData})
        }

        response.status(404).json({ code: 404, message: 'product data not found...', error: err.message });


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findAllProduct =async (request,response)=>{

    try{

        const {seachText,page=1,size=10}=request.query;
        const pageIndex=parseInt(page);
        const pageSize=parseInt(size);

        const query={};
        if(seachText){
            query.$text={$search:seachText}
        }
        const skip=(pageIndex-1)*pageSize;
        const productList=await ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const productListCount=await ProductSchema.countDocuments();
        return response.status(200).json({code:200,message:'product data..',data:{list:productList,productListCount}})


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });

    }




}

module.exports={
    createProduct,updateProduct,deleteProduct,findAllProduct,findProductById
}