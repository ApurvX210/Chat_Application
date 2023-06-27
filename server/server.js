import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const app=express();

app.get('/',(req,res)=>{
    console.log("Hello");
    res.send({Message:"Hello"})
})

const PORT=process.env.PORT || 4000
app.listen(PORT,()=> console.log("Connected To Server"))