import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  FormControl,
  Icon,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  getSender,
  capitalizeFirstLetter,
  getSenderId,
} from "../../Config/ChatLogic";
import typingAnimation from '../../typingA.json'
import "../../Styles/style.css";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const[typing,setTyping]=useState(false);
  const[istyping,setIsTyping]=useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [newMessage, setnewMessage] = useState("");
  const toast = useToast();
  const { user, selectedChat, setSelectedChat,notification,setNotification } = ChatState();
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    
  }, []);
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing",selectedChat._id)
      try {
        setnewMessage("");
        const { data } = await axios.post("/api/message", {
          content: newMessage,
          chatId: selectedChat._id,
        });
        setMessage([...message, data]);
        socket.emit("new message", data);
        console.log(data);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "Something went wrong while sending message",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const fetchMessages = async () => {
    if (Object.keys(selectedChat) == 0) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/message/${selectedChat._id}`);
      setMessage(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
      console.log(message);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Something went wrong while fetching message",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const typeHandler = (e) => {
    setnewMessage(e.target.value);
    if(!socketConnected){
      return;
    }
    if(!typing){
      setTyping(true);
      socket.emit("typing",selectedChat._id);
    }
    let lastTypingTime=new Date().getTime();
    var timerlen=3000;
    setTimeout(()=>{
      var timeNow=new Date().getTime();
      var timeDiff=timeNow-lastTypingTime
      if(timeDiff>=timerlen && typing){
        socket.emit('stop typing',selectedChat._id);
        setTyping(false);
      }
    },timerlen)
  };
  useEffect(() => {
    selectedChatCompare = selectedChat;
    fetchMessages();
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log(user.name);
      console.log(newMessageRecieved);
      if (
        Object.keys(selectedChatCompare) == 0 ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if(!notification.includes(newMessage)){
          setNotification([newMessageRecieved,...notification]);
          setFetchAgain(!fetchAgain);
        }
        
      } else {
        setMessage([...message, newMessageRecieved]);
      }
    });
    socket.on("typing",(room)=> {
      if(room==selectedChat._id){
        setIsTyping(true)
      }else{
        setIsTyping(false)
      }
    })
    socket.on("stop typing",(room)=>{
        setIsTyping(false);
    })
  });
  return (
    <>
      {Object.keys(selectedChat) != 0 ? (
        <>
          <Text
            fontSize={{ base: "22px", md: "25px" }}
            pb={"3"}
            px={"2"}
            w="100%"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fontFamily={"work+sans"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            ></IconButton>
            {!selectedChat?.groupChat ? (
              <>
                {capitalizeFirstLetter(getSender(user, selectedChat?.users))}
                <ProfileModal user={getSenderId(user, selectedChat?.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <div className="box">
            {loading ? (
              <Spinner size={"xl"} alignSelf={"center"} margin="auto" />
            ) : (
              <div className="message">
                <ScrollableChat message={message} />
              </div>
            )}
            {istyping?<div style={{height:"50px",width:"70px"}}><Lottie animationData={typingAnimation} loop={true}></Lottie></div>:<div style={{height:"50px",width:"70px"}}></div>}
            <FormControl mt={3} mb={2} ml={2} maxW={'98.4%'} onKeyDown={sendMessage} isRequired>
              <Input
                variant={"filled"}
                bg="#ffffff"
                placeholder="Enter Message"
                value={newMessage}
                onChange={typeHandler}
              />
            </FormControl>
          </div>
          
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h="100%"
        >
          <Text fontSize={"3xl"} pb={"3"}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
