const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();


const app=express();
const serverPort=process.env.SERVER_PORT|3000;

try{
    mongoose.connect('mongodb://127.0.0.1:27017/cpdp_db')
        app.listen(serverPort,()=>{
            console.log(`server up & running on port ${serverPort}`)
        })
}catch (e){
    console.log(e);
}

app.get('/test-api',(req, resp)=>{
    return resp.json({'message':'hi the server is Workin'})
});