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
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPass, setconfirmPassword] = useState('');
  const [Pass, setPass] = useState('');
  const [Pic, setPic] = useState();
  const [show, setShow] = useState(false)
  const[loading,setLoading]=useState(false);
  const handleClick = () => setShow(!show)
  const [show1, setShow1] = useState(false)
  const handleClick1 = () => setShow1(!show1)
  const toast = useToast()
  const navigate = useNavigate();
  const postDetail =(pic)=>{
    setLoading(true);
    if(pic===undefined){
      toast({
        title: 'Please select an Image!.',
        description: "We've created your account for you.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    if(pic.type==="image/jpeg" || pic.type==="image/png"){
      const data=new FormData();
      data.append("file",pic);
      data.append("upload_preset","Conversa");
      data.append("cloud_name","apurv210");
      
      fetch("https://api.cloudinary.com/v1_1/apurv210/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data?.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    
  }
  const handleSubmit = async()=>{
    setLoading(true);
    if(!name || !email || !Pass || !confirmPass){
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if(Pass!=confirmPass){
      toast({
        title: "Password does not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    
    try {
      const {data}=await axios.post('/api/auth/signup',{name,email,password:Pass,pic:Pic});
      toast({
        title: "Registration Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem('userInfo',JSON.stringify(data));
      setLoading(false);
      navigate('/chat');
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went Wrong",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  return (
    <VStack spacing={'4'}>
      <FormControl id='first-name' isRequired>
        <FormLabel>
          Name :
        </FormLabel>
        <Input type='text'  placeholder='Enter your Name' onChange={(e) => setName(e.target.value)} />
      </FormControl>
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
      <FormControl id='confirm-password' isRequired>
        <FormLabel>Confirm Password :</FormLabel>
        <InputGroup size='md' >
          <Input
            pr='4.5rem'
            type={show1 ? 'text' : 'password'}
            placeholder='Enter password'
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick1}>
              {show1 ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='photo' isRequired>
        <FormLabel>
          Upload your Profile :
        </FormLabel>
        <Input type='file' accept='image/*' onChange={(e) => postDetail(e.target.files[0])} border={'none'} />
      </FormControl>
      <Button colorScheme='yellow' size='md' onClick={handleSubmit} isLoading={loading}> 
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUp
