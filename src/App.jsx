import React, { useState } from 'react';
import {
  Box, VStack, Input, Button, Flex, Text, 
  InputGroup, InputRightElement, IconButton,
  Container, useBreakpointValue
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const IlvuLogo = () => {
  const logoSize = useBreakpointValue({ base: "320px", md: "400px" });
  
  return (
    <svg viewBox="0 0 400 120" width={logoSize} height={logoSize ? parseInt(logoSize) / 3.33 : "120"}>
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
      </defs>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
            fontSize="96" fontFamily="'Orbitron', sans-serif" fontWeight="bold"
            fill="url(#neonGradient)" filter="drop-shadow(0 0 5px #FFD700)">
        ilvu
      </text>
    </svg>
  );
};

const IlvuLandingPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const buttonWidth = useBreakpointValue({ base: "full", md: "auto" });

  return (
    <Flex minHeight="100vh" bg="gray.900" color="whiteAlpha.900" alignItems="center" justifyContent="center">
      <Container maxW="container.xl" centerContent py={4}>
        <VStack spacing={6} w="full" align="center">
          <Box width={{ base: "320px", md: "400px" }} height={{ base: "96px", md: "120px" }} mb={2}>
            <IlvuLogo />
          </Box>
          <Box 
            w="full" 
            maxW={{ base: "90%", sm: "450px", md: "500px" }}
            p={{ base: 6, md: 8 }} 
            borderRadius="xl" 
            bg="gray.800" 
            boxShadow="0 0 20px rgba(255, 215, 0, 0.3)"
            border="1px solid"
            borderColor="yellow.500"
          >
            <VStack spacing={6}>
              <InputGroup size="lg">
                <Input
                  placeholder="Username"
                  bg="gray.700"
                  border="none"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ boxShadow: '0 0 0 1px #FFD700' }}
                />
              </InputGroup>
              <InputGroup size="lg">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  bg="gray.700"
                  border="none"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ boxShadow: '0 0 0 1px #FFD700' }}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="lg"
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
                w={buttonWidth}
                bg="yellow.500"
                color="gray.900"
                _hover={{ bg: 'yellow.400' }}
                fontFamily="'Orbitron', sans-serif"
                fontSize={{ base: "md", md: "lg" }}
                py={{ base: 2, md: 3 }}
                size="lg"
              >
                Login
              </Button>
            </VStack>
          </Box>
          <Flex justify="center" align="center" flexDirection={{ base: "column", sm: "row" }} textAlign="center" mt={4}>
            <Text mr={{ base: 0, sm: 2 }} mb={{ base: 2, sm: 0 }} color="gray.400" fontSize={{ base: "sm", md: "md" }}>Don't have an account?</Text>
            <Button variant="link" color="yellow.500" _hover={{ color: 'yellow.400' }} fontSize={{ base: "sm", md: "md" }}>
              Sign Up
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Flex>
  );
};

export default IlvuLandingPage;
