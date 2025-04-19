const BookmarkSchema=require('../model/BookmarkSchema');
const createBookmark =async (request,response)=>{

    try{

        const {userId, productId,createDate} = request.body;
        if(!userId || !productId || !createDate){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }

        const bookmark=new BookmarkSchema({
            userId:userId,
            productId:productId,
            createDate:createDate
        });
        const saveData=await cart.save();
        console.log(saveData);
        return response.status(201).json({code:201,message:'bookmark has been saved..',data:saveData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }




}
const updateBookmark =async (request,response)=>{

    try{

        const {userId, productId,createDate} = request.body;
        if(!userId || !productId || !createDate){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }
        const updateData=await BookmarkSchema.findOneAndUpdate(
            {'_id':request.params.id},
            {$set: {
                    userId:userId,
                    productId:productId,
                    createDate:createDate
                }},
            {new:true});

        return response.status(200).json({code:200,message:'bookmark has been updated..',data:updateData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }


}
const deleteBookmark =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const deletedData=await BookmarkSchema.findOneAndDelete(
            {'_id':request.params.id});

        return response.status(204).json({code:204,message:'Bookmark has been deleted..',data:deletedData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findBookmarkById =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const bookmarkData=await BookmarkSchema.findById(
            {'_id':request.params.id});
        if(bookmarkData){
            return response.status(200).json({code:200,message:'bookmark data..',data:bookmarkData})
        }

        response.status(404).json({ code: 404, message: 'bookmark data not found...', error: err.message });


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findAllBookmark =async (request,response)=>{

    try{

        const {page=1,size=10}=request.query;
        const pageIndex=parseInt(page);
        const pageSize=parseInt(size);

        const skip=(pageIndex-1)*pageSize;
        const bookmarkList=await BookmarkSchema.find( )
            .limit(pageSize)
            .skip(skip);
        const bookmarkListCount=await BookmarkSchema.countDocuments();
        return response.status(200).json({code:200,message:'bookmark data..',data:{list:bookmarkList,bookmarkListCount}})


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });

    }




}

module.exports={

    createBookmark,updateBookmark,deleteBookmark,findAllBookmark,findBookmarkById
}