import React from 'react'
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
import { ChatState } from '../../Context/ChatProvider'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../../Config/ChatLogic';
const ScrollableChat = ({message}) => {
    const{user}=ChatState();
  return (
    <ScrollableFeed>
        {message?.map((m, i) => {
            return <div key={i} style={{display:'flex'}}>
                {
                    (isSameSender(message,m,i,user._id) || isLastMessage(message,i,user._id)) && (
                        <Tooltip>
                            <Avatar src={m.sender._id}/>
                        </Tooltip>
                    )
                }
            </div>
        }
       )}
      </ScrollableFeed>
  )
}

export default ScrollableChat
