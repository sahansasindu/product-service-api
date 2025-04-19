const CountrySchema=require('../model/CountrySchema');
const createCountry =async (request,response)=>{

    try{

        const {countryName, file, countryCode } = request.body;
        if(!countryName || !file || !countryCode){
            return response.status(400).json({code:400,message:'some field are missing!....',data:null})
        }

        const country=new CategorySchema({
            countryName:request.body.categoryName,
            flag :{
                hash:'Temp Hash',
                resourceUrl:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dogster.com%2Fdog-breeds%2Fsiberian-husky&psig=AOvVaw3OsoJffBOD68J582Yo3wjO&ust=1745048997121000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJC4k6KM4YwDFQAAAAAdAAAAABAE',
                fileName:'Temp FIle name ',
                directory:''},
            countryCode:countryCode

        });
        const saveData=await country.save();
        console.log(saveData);
        return response.status(201).json({code:201,message:'country has been saved..',data:saveData})

    }catch (err){
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }





}
const updateCountry =async (request,response)=>{

    try{

        const {  countryName} = request.body;

        if(! countryName || ! countryCode){
            return response.status(400).json({
                code:400,
                message:'some field are missing!....',
                data:null
            });
        }
        const updateData=await CountrySchema.findOneAndUpdate(
            {'_id':request.params.id},
            {$set: {
                    countryName: countryName,
                    countryCode:countryCode}},
            {new:true});

        return response.status(200).json({code:200,message:'country has been updated..',data:updateData})

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

        response.status(404).json({ code: 404, message: 'counter data not found...', error: err.message });


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