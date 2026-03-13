const CountrySchema=require('../model/CountrySchema');
const createCountry =async (request,response)=>{

    try{

        const { countryName, file, flag, countryCode } = request.body;
        const finalFlag = flag || file;

        if (!countryName || !finalFlag || !countryCode) {
            return response.status(400).json({ code: 400, message: 'countryName, flag/file, and countryCode are required!....', data: null });
        }

        const country = new CountrySchema({
            countryName: countryName,
            flag: finalFlag,
            countryCode: countryCode
        });
        const saveData = await country.save();
        console.log(saveData);
        return response.status(201).json({ code: 201, message: 'country has been saved..', data: saveData });

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }





}
const updateCountry =async (request,response)=>{

    try{

        const { countryName, countryCode, flag, file } = request.body;
        const finalFlag = flag || file;

        const updateFields = {};
        if (countryName) updateFields.countryName = countryName;
        if (countryCode) updateFields.countryCode = countryCode;
        if (finalFlag) updateFields.flag = finalFlag;

        if (Object.keys(updateFields).length === 0) {
            return response.status(400).json({ code: 400, message: 'No fields provided for update!....', data: null });
        }

        const updateData = await CountrySchema.findOneAndUpdate(
            { '_id': request.params.id },
            { $set: updateFields },
            { new: true });

        if (!updateData) {
            return response.status(404).json({ code: 404, message: 'Country not found...', data: null });
        }

        return response.status(200).json({ code: 200, message: 'country has been updated..', data: updateData });

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }


}
const deleteCountry =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const deletedData=await CountrySchema.findOneAndDelete(
            {'_id':request.params.id});

        return response.status(204).json({code:204,message:'country has been deleted..',data:deletedData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findCountryById =async (request,response)=>{
    try{

        if(!request.params.id){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const countryData=await CountrySchema.findById(
            {'_id':request.params.id});
        if(countryData){
            return response.status(200).json({code:200,message:'country data..',data:countryData})
        }

        response.status(404).json({ code: 404, message: 'country data not found...', error: err.message });


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findAllCountries =async (request,response)=>{

    try{

        const {seachText,page=1,size=10}=request.query;
        const pageIndex=parseInt(page);
        const pageSize=parseInt(size);

        const query={};
        if(seachText){
            query.$text={$search:seachText}
        }
        const skip=(pageIndex-1)*pageSize;
        const countryList=await CountrySchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const countryListCount=await CountrySchema.countDocuments();
        return response.status(200).json({code:200,message:'country data..',data:{list:countryList,countryListCount}})


    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });

    }




}

module.exports={
    createCountry,updateCountry,deleteCountry,findAllCountries,findCountryById
}