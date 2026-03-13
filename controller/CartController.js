const CartSchema=require('../model/CartSchema');
const createCartRecord =async (request,response)=>{

    try{

        const {userId, productId,qty,createDate} = request.body;
        if(!userId || !productId || !qty || !createDate){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }

        const cart=new CartSchema({
            userId:userId,
            productId:productId,
            qty:qty,
            createDate:createDate
        });
        const saveData=await cart.save();
        console.log(saveData);
        return response.status(201).json({code:201,message:'cart has been saved..',data:saveData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }





}
const updateCart =async (request,response)=>{

    try{

        const updateData=await CartSchema.findOneAndUpdate(
            {'_id':request.params.id},
            {$set: request.body},
            {new:true});

        if(!updateData){
            return response.status(404).json({code:404,message:'cart not found..',data:null})
        }

        return response.status(200).json({code:200,message:'cart has been updated..',data:updateData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }


}
const deleteCart =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const deletedData=await CartSchema.findOneAndDelete(
            {'_id':request.params.id});

        if(deletedData){
            return response.status(200).json({code:200,message:'cart has been deleted successfully',data:deletedData})
        }else{
            return response.status(404).json({code:404,message:'cart not found',data:null})
        }

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findCartById =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const cartData=await CartSchema.findById(
            {'_id':request.params.id});
        if(cartData){
            return response.status(200).json({code:200,message:'cart data..',data:cartData})
        }

        response.status(404).json({ code: 404, message: 'cart data not found...', error: err.message });


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findAllCart =async (request,response)=>{

    try{

        const {page=1,size=10}=request.query;
        const pageIndex=parseInt(page);
        const pageSize=parseInt(size);

        const skip=(pageIndex-1)*pageSize;
        const cartList=await CartSchema.find( )
            .limit(pageSize)
            .skip(skip);
        const cartListCount=await CartSchema.countDocuments();
        return response.status(200).json({code:200,message:'cart data..',data:{list:cartList,cartListCount}})


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });

    }




}

module.exports={

    createCartRecord,updateCart,deleteCart,findAllCart,findCartById
}