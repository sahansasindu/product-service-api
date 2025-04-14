const express=require('express');
const mongoose=require('mongoose');


const app=express();

try{
    mongoose.connect('mongodb://127.0.0.1:27017/cpdp_db')
        app.listen(3000,()=>{
            console.log('server up & running on port 3000')
        })
}catch (e){
    console.log(e);
}

app.get('/test-api',(req, resp)=>{
    return resp.json({'message':'hi the server is Workin'})
});