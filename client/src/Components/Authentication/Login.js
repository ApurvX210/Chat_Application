import { Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, InputGroup, Button, InputRightElement,useToast
} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast=useToast();

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !Pass) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password:Pass }
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/chat');
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing={'4'}>
      <FormControl id='email' isRequired>
        <FormLabel>Email address :</FormLabel>
        <Input type='email'  placeholder='Enter your Name' onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password :</FormLabel>
        <InputGroup size='md' >
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            onChange={(e) => setPass(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme='yellow' size='md' onClick={handleSubmit} isLoading={loading}> 
        Log In
      </Button>
    </VStack>
  )
}

export default Login
