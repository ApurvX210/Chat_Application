import { Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, InputGroup, Button, InputRightElement
} from '@chakra-ui/react'
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPass, setconfirmPassword] = useState('');
  const [Pass, setPass] = useState('');
  const [Pic, setPic] = useState();
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const [show1, setShow1] = useState(false)
  const handleClick1 = () => setShow1(!show1)
  const handleSubmit = ()=>{
    
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
        <Input type='file' accept='image/*' onChange={(e) => setPic(e.target.files[0])} border={'none'} />
      </FormControl>
      <Button colorScheme='yellow' size='md' onSubmit={handleSubmit}> 
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUp
