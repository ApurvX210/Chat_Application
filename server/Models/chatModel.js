import mongoose from "mongoose";

const chatSchema= mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    groupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.ObjectId,
        ref:"users"
    }],
    latestMessage:{
        type:mongoose.ObjectId,
        ref:"messages"
    },
    groupAdmin:{
        type:mongoose.ObjectId,
        ref:"users"
    }
},{timestamps:true})
export default mongoose.model("chats",chatSchema);
