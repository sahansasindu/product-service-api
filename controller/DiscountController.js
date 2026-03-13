const DiscountSchema=require('../model/DiscountSchema');
const createDiscount =async (request,response)=>{

    try{

        const { discountName, discountPercentage, percentage, startDate, EndDate, LastUpdate, active } = request.body;
        const finalPercentage = percentage || discountPercentage;

        if (!discountName || !finalPercentage) {
            return response.status(400).json({ code: 400, message: 'discountName and percentage are required!....', data: null });
        }

        const discount = new DiscountSchema({
            discountName: discountName,
            percentage: finalPercentage,
            startDate: startDate,
            EndDate: EndDate,
            LastUpdate: LastUpdate,
            active: active !== undefined ? active : true
        });
        const saveData = await discount.save();
        console.log(saveData);
        return response.status(201).json({ code: 201, message: 'discount has been saved..', data: saveData });

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }





}
const updateDiscount =async (request,response)=>{

    try{

        const { discountName, discountPercentage, percentage, startDate, EndDate, LastUpdate, active } = request.body;
        
        const updateFields = {};
        if (discountName) updateFields.discountName = discountName;
        if (percentage || discountPercentage) updateFields.percentage = percentage || discountPercentage;
        if (startDate) updateFields.startDate = startDate;
        if (EndDate) updateFields.EndDate = EndDate;
        if (LastUpdate) updateFields.LastUpdate = LastUpdate;
        if (active !== undefined) updateFields.active = active;

        if (Object.keys(updateFields).length === 0) {
            return response.status(400).json({ code: 400, message: 'No fields provided for update!....', data: null });
        }

        const updateData = await DiscountSchema.findOneAndUpdate(
            { '_id': request.params.id },
            { $set: updateFields },
            { new: true });

        if (!updateData) {
            return response.status(404).json({ code: 404, message: 'Discount not found...', data: null });
        }

        return response.status(200).json({ code: 200, message: 'discount has been updated..', data: updateData });

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }


}
const deleteDiscount =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const deletedData=await DiscountSchema.findOneAndDelete(
            {'_id':request.params.id});

        return response.status(204).json({code:204,message:'discount has been deleted..',data:deletedData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findDiscountById =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const discountData=await DiscountSchema.findById(
            {'_id':request.params.id});
        if(discountData){
            return response.status(200).json({code:200,message:'discount data..',data:discountData})
        }

        response.status(404).json({ code: 404, message: 'discount data not found...', error: err.message });


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findAllDiscount =async (request,response)=>{

    try{

        const {seachText,page=1,size=10}=request.query;
        const pageIndex=parseInt(page);
        const pageSize=parseInt(size);

        const query={};
        if(seachText){
            query.$text={$search:seachText}
        }
        const skip=(pageIndex-1)*pageSize;
        const discountList=await DiscountSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const discountListCount=await DiscountSchema.countDocuments();
        return response.status(200).json({code:200,message:'discount data..',data:{list:discountList,discountListCount}})


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });

    }




}

module.exports={
    createDiscount,updateDiscount,deleteDiscount, findDiscountById,findAllDiscount
}