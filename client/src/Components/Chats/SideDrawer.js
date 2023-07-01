import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import {useNavigate} from 'react-router-dom'
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchReslt, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user,setUser } = ChatState();
  const navigate=useNavigate();
  const logoutHandler =()=>{
    localStorage.removeItem("userInfo");
    setUser({});
    navigate('/');
  }
  return (
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
        <Button variant={"ghost"}>
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
            <MenuItem >Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
};

export default SideDrawer;
