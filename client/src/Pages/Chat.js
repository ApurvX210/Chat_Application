import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../Components/Chats/SideDrawer';
import MyChats from '../Components/Chats/MyChats';
import ChatBox from '../Components/Chats/ChatBox';
import { ChatState } from '../Context/ChatProvider';
const Chat = () => {
  const{user}=ChatState();
  const[fetchAgain,setFetchAgain]=useState(false);
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box display={'flex'}  justifyContent={'space-between'} w={'100%'} h={'90.5vh'} p={'2'}>
        {user?.token && <MyChats fetchAgain={fetchAgain}/>}
        {user?.token && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default Chat
