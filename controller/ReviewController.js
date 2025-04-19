const ReviewSchema=require('../model/ReviewSchema');
const createReview =async (request,response)=>{

    try{

        const { orderId,message,createdDate,userId,displayName,productId,rating} = request.body;
        if(!orderId || !message || !createdDate || !userId || !displayName || ! productId || !rating){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }

        const review=new ReviewSchema({
            orderId:orderId,
            message:message,
            createdDate:createdDate,
            userId:userId,
            displayName:displayName,
            productId:productId,
            rating:rating
        });
        const saveData=await review.save();
        console.log(saveData);
        return response.status(201).json({code:201,message:'bookmark has been saved..',data:saveData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }




}
const updateReview =async (request,response)=>{

    try{

        const { orderId,message,createdDate,userId,displayName,productId,rating} = request.body;
        if(!orderId || !message || !createdDate || !userId || !displayName || ! productId || !rating){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }
        const updateData=await ReviewSchema.findOneAndUpdate(
            {'_id':request.params.id},
            {$set: {
                    orderId:orderId,
                    message:message,
                    createdDate:createdDate,
                    userId:userId,
                    displayName:displayName,
                    productId:productId,
                    rating:rating
                }},
            {new:true});

        return response.status(200).json({code:200,message:'review has been updated..',data:updateData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }


}
const deleteReview =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const deletedData=await ReviewSchema.findOneAndDelete(
            {'_id':request.params.id});

        return response.status(204).json({code:204,message:'review has been deleted..',data:deletedData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findReviewById =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const reviewData=await ReviewSchema.findById(
            {'_id':request.params.id});
        if(reviewData){
            return response.status(200).json({code:200,message:'review data..',data:reviewData})
        }

        response.status(404).json({ code: 404, message: 'review data not found...', error: err.message });


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findAllReview =async (request,response)=>{

    try{

        const {page=1,size=10}=request.query;
        const pageIndex=parseInt(page);
        const pageSize=parseInt(size);

        const skip=(pageIndex-1)*pageSize;
        const reviewList=await ReviewSchema.find( )
            .limit(pageSize)
            .skip(skip);
        const reviewListCount=await ReviewSchema.countDocuments();
        return response.status(200).json({code:200,message:'bookmark data..',data:{list:reviewList,reviewListCount}})


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });

    }




}

module.exports={

    createReview,updateReview,deleteReview,findAllReview,findAllReview
}