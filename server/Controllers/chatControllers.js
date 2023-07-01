import chatModel from '../Models/chatModel.js'
import userModel from '../Models/userModel.js'
export const accessChat = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("No userId");
        res.status(400).send({ message: "UserId is Null" });
    }
    var isChat = await chatModel.find({
        groupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],

    }).populate("users", "-password").populate("latestMessage");
    isChat = await userModel.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    })
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            groupChat: false,
            users: [req.user._id, userId],
        }
        try {
            const createdChat = await chatModel.create(chatData);
            const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(FullChat);
        } catch (error) {
            console.log(error);
        }
    }
};
export const fetchChat = async (req, res) => {
    try {
        chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: '-1' }).then(async (result) => {
            result = await userModel.populate(result, {
                path: "latestMessage.sender",
                select: "name pic email"
            })
            res.status(201).send(result);
        });

    } catch (error) {
        console.log(error);
    }
}
export const createGroupChat = async (req, res) => {
    try {
        const { name } = req.body;
        var { users } = req.body;
        if (!name || !users) {
            return res.status(400).send({ message: "Please enter all the fields" });
        }
        if (users.length < 2) {
            return res.status(400).send({ message: "More than two user in Group Chat" });
        }
        users.push(req.user._id);

        const groupChat = await chatModel.create({
            chatName: name,
            users: users,
            groupChat: true,
            groupAdmin: req.user._id
        })
        const fullGroupChat = await chatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        console.log(error);
    }
}
export const renameGroup =async(req,res)=>{
    try {
        const{chatId,chatName}=req.body;
        const updatedChat=await chatModel.findByIdAndUpdate(chatId,{chatName:chatName},{new:true}).populate("users","-password").populate("groupAdmin","-password");
        res.status(201).json(updatedChat);
    } catch (error) {
        console.log(error);
    }
}
export const removeFromGroup =async(req,res)=>{
    try {
        const{chatId,userId}=req.body;
        const removed = await chatModel.findByIdAndUpdate(chatId,{
            $pull:{users:userId}
        },{new:true}).populate("users","-password").populate("groupAdmin","-password");
        res.json(removed);
    } catch (error) {
        console.log(error);
    }
}
export const addToGroup =async(req,res)=>{
    try {
        const{chatId,userId}=req.body;
        const added = await chatModel.findByIdAndUpdate(chatId,{
            $push:{users:userId}
        },{new:true}).populate("users","-password").populate("groupAdmin","-password");
        res.json(added);
    } catch (error) {
        console.log(error);
    }
}