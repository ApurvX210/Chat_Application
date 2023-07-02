import {createContext, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const[user,SetUser]=useState({});
    const navigate=useNavigate();
    axios.defaults.headers.common['Authorization']=`Bearer ${user?.token}`
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"));
        SetUser(userInfo);

        if(!userInfo){
            navigate('/');
        }
    },[navigate])
    return (
        <ChatContext.Provider value={{user,SetUser}}>
            {children}
        </ChatContext.Provider>
    )
};
export const ChatState=()=>{
    return useContext(ChatContext);
}
export default ChatProvider;