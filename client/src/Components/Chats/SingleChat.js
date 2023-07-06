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
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  getSender,
  capitalizeFirstLetter,
  getSenderId,
} from "../../Config/ChatLogic";
import "../../Styles/style.css";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setnewMessage] = useState("");
  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setnewMessage("");
        const { data } = await axios.post("/api/message", {
          content: newMessage,
          chatId: selectedChat._id,
        });
        setMessage([...message, data]);
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
    if (!selectedChat) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/message/${selectedChat._id}`);
      setMessage(data);
      setLoading(false);
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
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
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
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner size={"xl"} alignSelf={"center"} margin="auto" />
            ) : (
              <div className="message">
                <ScrollableChat message={message}/>
              </div>
            )}
            <FormControl mt={3} onKeyDown={sendMessage} isRequired>
              <Input
                variant={"filled"}
                bg="#E0E0E0"
                placeholder="Enter Message"
                value={newMessage}
                onChange={typeHandler}
              />
            </FormControl>
          </Box>
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
