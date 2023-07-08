import chatModel from "../Models/chatModel.js";
import messageModel from "../Models/messageModel.js";
import userModel from "../Models/userModel.js";

export const sendMessage = async(req,res)=>{
    try {
        const{content,chatId}=req.body;
        if(!content || !chatId){
            return res.status(400).send({message:"Invalid Data"});
        }
        var newMessage={
            sender:req.user._id,
            content:content,
            chat:chatId
        }
        var message=await messageModel.create(newMessage);
        message=await message.populate("sender","name pic")
        message=await message.populate("chat")
        message=await userModel.populate(message,{
            path:'chat.users',
            select:"name pic email"
        })
        await chatModel.findByIdAndUpdate(chatId,{latestMessage:message});
        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(400);
    }
}
export const allMessages =async(req,res)=>{
    try {
        const{chatId}=req.params;
        if(chatId===undefined){
            return res.status(400).send({message:"Error Occured"});
        }
        const message=await messageModel.find({chat:chatId}).populate("sender","name pic email").populate("chat");
        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(400);
    }
}