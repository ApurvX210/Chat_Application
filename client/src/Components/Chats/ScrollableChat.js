import React from "react";
import {
  Box,
  Button,
  Drawer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Toast,
  useToast,
  Spinner,
  Avatar,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";
import { SameUser, isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../Config/ChatLogic";
const ScrollableChat = ({ message }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {message?.map((m, i) => {
        return (
          <div key={i} style={{ display: "flex" ,marginTop:isSameUser(message,m,i,user._id)}} >
            {isSameSender(message, m, i, user._id) 
             && (
              <Tooltip label={m.sender.name} placement={"bottom-end"} hasArrow >
                <Avatar
                  mt={"7px"}
                  mr={1}
                  size={"sm"}
                  src={m.sender.pic}
                  cursor={"pointer"}
                  name={m.sender.name}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#C4A185" : "#ffffff"
                }`,
                color:`${
                  m.sender._id === user._id ? "#ffffff" : "black"
                }`,
                borderRadius: "15px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft:isSameSenderMargin(message,m,i,user._id),
                
              }}
            >
              {m.content}
            </span>
          </div>
        );
      })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
