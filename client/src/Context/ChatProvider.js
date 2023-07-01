import {createContext, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const[user,SetUser]=useState();
    const navigate=useNavigate();
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