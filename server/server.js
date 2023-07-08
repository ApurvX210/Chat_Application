import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import authRoutes from './Routes/authRoutes.js'
import chatRoutes from './Routes/chatRoutes.js'
import messageRoutes from './Routes/messageRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cors from 'cors'
import { Server } from "socket.io";
import { createServer } from "http";
const app=express();
dotenv.config();
connectDB();
app.get('/',(req,res)=>{
    console.log("Hello");
    res.send({Message:"Hello"})
})
app.use(express.json());
//Api 
app.use('/api/auth',authRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
//error handler
app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT || 4000
const httpServer = createServer(app);
const io=new Server(httpServer,{
	pingTimeout:60000,
	cors:({
		origin: "http://localhost:3000"
	})
})
io.on("connection",(socket)=>{
	console.log("Connected to socket.io");
	socket.on("setup",(userData)=>{
		socket.join(userData._id);
		socket.emit("connected")
	})
	socket.on("join chat",(room)=>{
		socket.join(room);
		console.log("User joined room "+room);
	})
	socket.on("new message",(newMessageRecieved)=>{
		var chat=newMessageRecieved.chat;
		if(!chat.users){
			return console.log("Chat.user not defined");
		}
		console.log(chat)
		chat.users.forEach(user =>{
			if(user._id==newMessageRecieved.sender._id){
				return;
			}
			console.log(user)
			socket.in(user._id).emit("message recieved",newMessageRecieved);
		})
	})
	socket.on("typing",(room)=>{
		socket.in(room).emit("typing",room)
	})
	socket.on("stop typing",(room)=>{
		socket.in(room).emit("stop typing",room)
	})
	socket.off("setup",()=>{
		console.log("User Disconnected");
		socket.leave(userData._id);
	})
})
httpServer.listen(PORT,()=>console.log("Server Started"));