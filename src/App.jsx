import React, { useState } from 'react';
import {
  Box, VStack, Input, Button, Flex, Text, 
  InputGroup, InputRightElement, IconButton, Container, Heading
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const IlvuLogo = () => (
  <svg viewBox="0 0 300 90" width="100%" height="100%">
    <defs>
      <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
          fontSize="72" fontFamily="'Orbitron', sans-serif" fontWeight="bold"
          fill="url(#neonGradient)" filter="drop-shadow(0 0 5px #FFD700)">
      ilvu
    </text>
  </svg>
);

const IlvuLandingPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box minHeight="100vh" bg="gray.900" color="whiteAlpha.900">
      <Container maxW="container.xl" centerContent>
        <VStack spacing={12} my={16}>
          <Box width="600px" height="100px" mb={8} display="flex" justifyContent="center">
            <IlvuLogo />
          </Box>
          <Box 
            w="full" 
            maxW="md" 
            p={8} 
            borderRadius="xl" 
            bg="gray.800" 
            boxShadow="0 0 20px rgba(255, 215, 0, 0.3)"
            border="1px solid"
            borderColor="yellow.500"
          >
            <VStack spacing={6}>
              <InputGroup>
                <Input
                  placeholder="Username"
                  bg="gray.700"
                  border="none"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ boxShadow: '0 0 0 1px #FFD700' }}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  bg="gray.700"
                  border="none"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ boxShadow: '0 0 0 1px #FFD700' }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    color="yellow.500"
                    _hover={{ bg: 'gray.700' }}
                  />
                </InputRightElement>
              </InputGroup>
              <Button 
                w="full"
                bg="yellow.500"
                color="gray.900"
                _hover={{ bg: 'yellow.400' }}
                fontFamily="'Orbitron', sans-serif"
              >
                Login
              </Button>
          <Flex justify="center" align="center">
            <Text mr={2} color="gray.400">Don't have an account?</Text>
            <Button variant="link" color="yellow.500" _hover={{ color: 'yellow.400' }}>
              Sign Up
            </Button>

          </Flex>

            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default IlvuLandingPage;
