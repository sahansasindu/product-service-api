const ProductSchema=require('../model/ProductSchema');
const createProduct =async (request,response)=>{

    try{

        const { productName, images, actualPrice, actiualPrice, oldPrice, qty, description, discount, categoryId } = request.body;
        const finalPrice = actualPrice || actiualPrice;

        if (!productName || !images || !finalPrice || !oldPrice || !qty || !description || !discount || !categoryId) {
            return response.status(400).json({ code: 400, message: 'some field are missing!....', data: null });
        }

        const product = new ProductSchema({
            productName: productName,
            images: images,
            actualPrice: finalPrice,
            oldPrice: oldPrice,
            qty: qty,
            description: description,
            discount: discount,
            categoryId: categoryId
        });
        const saveData = await product.save();
        console.log(saveData);
        return response.status(201).json({ code: 201, message: 'product has been saved..', data: saveData });

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }





}
const updateProduct =async (request,response)=>{

    try{
        const { productName, images, actualPrice, actiualPrice, oldPrice, qty, description, discount, categoryId } = request.body;
        
        const updateFields = {};
        if (productName) updateFields.productName = productName;
        if (images) updateFields.images = images;
        if (actualPrice || actiualPrice) updateFields.actualPrice = actualPrice || actiualPrice;
        if (oldPrice) updateFields.oldPrice = oldPrice;
        if (qty !== undefined) updateFields.qty = qty;
        if (description) updateFields.description = description;
        if (discount) updateFields.discount = discount;
        if (categoryId) updateFields.categoryId = categoryId;

        if (Object.keys(updateFields).length === 0) {
            return response.status(400).json({ code: 400, message: 'No fields provided for update!....', data: null });
        }

        const updateData = await ProductSchema.findOneAndUpdate(
            { '_id': request.params.id },
            { $set: updateFields },
            { new: true });

        if (!updateData) {
            return response.status(404).json({ code: 404, message: 'Product not found...', data: null });
        }

        return response.status(200).json({ code: 200, message: 'product has been updated..', data: updateData });

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
        const productData = await ProductSchema.findById(
            { '_id': request.params.id });
        if (productData) {
            return response.status(200).json({ code: 200, message: 'product data..', data: productData });
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