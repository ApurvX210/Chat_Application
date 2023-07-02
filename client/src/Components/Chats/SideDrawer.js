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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchReslt, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, SetUser } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    SetUser({});
    navigate("/");
  };
  const toast=useToast();
  const handleSearch = async()=>{
    if(!search){
      toast({
        title: 'Please enter something!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:'top-left'
      })
    }
    try {
      setLoading(true);
      const{data}=await axios.get(`/api/auth/users?search=${search}`);
      console.log("hello")
      setSearchResult(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:'top-left'
      })
    }
  }
  const accessChat =()=>{

  }
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"#FDF0E7"}
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
        <Text fontSize={"2xl"} color={"#AD825F"} fontFamily={"Belanosima"}>
          CONVERSA
        </Text>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Menu>
            <MenuButton p={"1"}>
              <BellIcon fontSize={"2xl"} m={"1"} />
              {/* <MenuList></MenuList> */}
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              bg={"#FDF0E7"}
              as={Button}
              rightIcon={<ChevronDownIcon />}
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
            <Box display={'flex'} pb={'2'}>
              <Input
                placeholder="Type here..."
                mr={"2"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading?(
              <ChatLoading/>
            ):(
                searchReslt?.map(user=>(
                  <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)}/>
                ))
            )}
          </DrawerBody>

          
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
