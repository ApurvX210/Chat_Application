import {createContext, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
const ChatContext = createContext();

const ChatProvider =({children})=>{
    const[user,SetUser]=useState({});
    const[selectedChat,setSelectedChat]=useState({});
    const[chats,setChats]=useState([]);
    const navigate=useNavigate();
    axios.defaults.headers.common['Authorization']=`Bearer ${user?.token}`
    useEffect(()=>{
        const fetchUserData = async () => {
            const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
            SetUser(userInfo);
            if (!userInfo) {
              navigate("/");
            }
          };
          fetchUserData();
    },[navigate])
    return (
        <ChatContext.Provider value={{user,SetUser,selectedChat,setSelectedChat,chats,setChats}}>
            {children}
        </ChatContext.Provider>
    )
};
export const ChatState=()=>{
    return useContext(ChatContext);
}
export default ChatProvider;