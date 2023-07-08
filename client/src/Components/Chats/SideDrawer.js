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
} from "@chakra-ui/react";
import { Badge } from "antd";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { getSender } from "../../Config/ChatLogic";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchReslt, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    user,
    SetUser,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    SetUser({});
    navigate("/");
  };
  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/auth/users?search=${search}`);
      console.log("hello");
      setSearchResult(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await axios.post("/api/chat", { userId });
      setLoadingChat(false);
      setSelectedChat(data);
      onClose();
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"#F8DCB7"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth={"5px"}
        borderColor={"#C4A185"}
      >
        <Tooltip label="Search User to chat" hasArrow>
          <Button variant={"ghost"} onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={"4"}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"3xl"} color={"#AD825F"} fontFamily={"Belanosima"}>
          CONVERSA
        </Text>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Menu>
            <MenuButton p={"1"}>
              <Badge count={notification.length} size="small">
                <BellIcon fontSize={"2xl"} mr={"1"} />
              </Badge>
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No new message"}
              {notification?.map((notif) => {
                return (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.groupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              bg={"#FDF0E7"}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              ml={3}
            >
              <Avatar
                src={user.pic}
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} pb={"2"}>
              <Input
                placeholder="Type here..."
                mr={"2"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchReslt?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner d="flex" marginLeft={"auto"} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
