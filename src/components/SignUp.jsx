import React, { useState } from 'react';
import {
  Box, VStack, Input, Button, Flex, Text, 
  InputGroup, InputRightElement,Container, useBreakpointValue, Link, Badge, Icon
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from "react-icons/fc"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";


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

const IlvuSignUpPage = () => {
  const navigate = useNavigate();
  return (
    <Flex minHeight="100vh" bg="gray.900" color="whiteAlpha.900" alignItems="center" justifyContent="center">
      <Container maxW="container.xl" centerContent py={4}>
        <VStack spacing={6} w="full" align="center">
          <Box width={{ base: "320px", md: "400px" }} height={{ base: "96px", md: "120px" }} mb={2}>
            <IlvuLogo />
          </Box>
          <Flex justify="center" align="center" flexDirection={{ base: "column", sm: "row" }} textAlign="center" mt={4}>
             <Button colorScheme='yellow' size='lg'
              onClick={() => {
                const provider = new GoogleAuthProvider();
                const auth = getAuth();

                signInWithPopup(auth, provider)
                  .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    navigate('/dashboard');
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    
                  });
              }}
            >
              <Icon as={FcGoogle} boxSize={7} />
              <Text ml={2}>Sign in with Google</Text>
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Flex>
  );
};

export default IlvuSignUpPage;
