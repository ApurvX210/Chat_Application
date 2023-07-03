import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import authRoutes from './Routes/authRoutes.js'
import chatRoutes from './Routes/chatRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cors from 'cors'
const app=express();
dotenv.config();
connectDB();
app.get('/',(req,res)=>{
    console.log("Hello");
    res.send({Message:"Hello"})
})
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
//Api 
app.use('/api/auth',authRoutes);
app.use('/api/chat',chatRoutes);
//error handler
app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT || 4000
app.listen(PORT,()=> console.log("Connected To Server"));