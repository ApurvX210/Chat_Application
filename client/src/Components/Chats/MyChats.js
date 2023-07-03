import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../Config/ChatLogic";
const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, SetUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const toast = useToast();
  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      setChats(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong while Retrieving Chats",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        display={"flex"}
        fontSize={{ base: "22px", md: "25px" }}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Button
          display={"flex"}
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Box>
      <Box
        display={"flex"}
        flexDir="column"
        p={3}
        bg="#F8EFE6"
        height={"90%"}
        w="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats?.length > 0 ? (
          <Stack overflowY={"scroll"}>
            {chats?.map((chat) => {
              return (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.groupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
