import { Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, InputGroup, Button, InputRightElement
} from '@chakra-ui/react'
const Login = () => {
  const [email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const handleSubmit = ()=>{
    
  }
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
      <Button colorScheme='yellow' size='md' onSubmit={handleSubmit}> 
        Log In
      </Button>
    </VStack>
  )
}

export default Login
