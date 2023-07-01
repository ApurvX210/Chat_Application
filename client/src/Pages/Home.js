import React, { useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container, Box, Text } from '@chakra-ui/react'
import Login from '../Components/Authentication/Login'
import SignUp from '../Components/Authentication/SignUp'
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
        navigate('/chat');
    }
},[navigate]);
  return (
    <Container maxW='xl' centerContent>

      <Text textAlign={'center'} fontSize={'4xl'} color={'#AD825F'} mt={'7%'} mb={3} fontFamily={'Belanosima'}>CONVERSA</Text>

      <Box w='100%' p={4} bg={'white'} borderRadius={'30'}>
        <Tabs variant='soft-rounded' colorScheme='yellow'>
          <TabList>
            <Tab w={'50%'}>Login</Tab>
            <Tab w={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home
