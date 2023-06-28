import mongoose from "mongoose";

const messageSchema= mongoose.Schema({
    sender:{
        type:mongoose.ObjectId,
        ref:"users"
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:mongoose.ObjectId,
        ref:"chats"
    }
},{timestamps:true})
export default mongoose.model("messages",messageSchema);
