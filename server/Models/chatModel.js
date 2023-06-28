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
        ref:"Users"
    }],
    latestMessage:{
        type:mongoose.ObjectId,
        ref:"Messages"
    },
    groupAdmin:{
        type:mongoose.ObjectId,
        ref:"Users"
    }
},{timestamps:true})
export default mongoose.model("chats",chatSchema);
