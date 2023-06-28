import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();
const app=express();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connected to Database"));
app.get('/',(req,res)=>{
    console.log("Hello");
    res.send({Message:"Hello"})
})

const PORT=process.env.PORT || 4000
app.listen(PORT,()=> console.log("Connected To Server"))